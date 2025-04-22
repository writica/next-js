import { ActionProvider, WalletProvider, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";
import fs from "fs";
import path from "path";
import natural from "natural";

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Vectorize function - tokenizes and stems text
function vectorize(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  return tokenizer.tokenize(text.toLowerCase())
    .map(word => stemmer.stem(word));
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: string[], vecB: string[]): number {
  const intersection = vecA.filter(word => vecB.includes(word));
  return intersection.length / Math.sqrt(vecA.length * vecB.length) || 0;
}

export const RagSearchSchema = z.object({
  query: z.string().min(1, "Query must not be empty"),
  total: z.number().optional().default(5),
});

export interface SearchResult {
  id: string;
  content: string;
  metadata: Record<string, string | number | boolean>; // Specify allowed types for metadata values
  score: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
}

class RagActionProvider extends ActionProvider<WalletProvider> {
    constructor() {
        super("rag-action-provider", []);
    }

    @CreateAction({
        name: "rag-search",
        description: `Retrieves relevant documents and glossary entries to support answers about crypto, blockchain, or Web3.
Use this when the user asks about related projects, tools, or terms such as: Edu Chain, Faucet, Deploy, Smart Contract, Open Campus, Arbitrum Orbit, Codex RPC Node, Faucet, Smart Contract, Gelato, Zero Dev, LayerZero, Oracle, DIA, Wallet, Wallet as a Service, Privy, Web3Auth, SailFish, MoveFlow, Blend, Camelot, GainzSwap, ThrustPad, EduScan, Grasp Academy, EduHub, EduGPT, Daily Wiser, TinyTap, Pody Network, Proof of Learn.
Also covers terms like: GM, DAA, DAO, DeFi, EIP, EVM, GRC-20, ICO, IEO, KYC, NPoS, NGMI, NFT, OCID, PPLNS, PoW, PoS, TGE, EAS, ZK, zkML.
Has its own internal glossary and should be used to enhance responses with accurate definitions and context.`,
        schema: RagSearchSchema,
    })
    async search(args: z.infer<typeof RagSearchSchema>): Promise<SearchResponse> {
        const { query, total } = args;

        console.log(`>>> RAG search query: ${query}`);
        
        try {
            // Load the knowledge base
            const dataFilePath = path.join(process.cwd(), 'embedding_docs/output', 'all.json');
            
            if (!fs.existsSync(dataFilePath)) {
                throw new Error('Embedding data not found, run the extraction first');
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
            
            // Create query vector
            const queryVector = vectorize(query);
            
            // Find similar documents
            const results = data
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((doc: any) => ({
                    id: doc.id || 'unknown',
                    content: doc.content,
                    metadata: doc.metadata || {},
                    score: cosineSimilarity(queryVector, vectorize(doc.content))
                }))
                .filter((doc: SearchResult) => doc.score > 0) // Only return relevant results
                .sort((a: SearchResult, b: SearchResult) => b.score - a.score) // Sort by relevance
                .slice(0, total); // Limit to specified number of results
            
            return {
                query,
                results,
                totalResults: results.length
            };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error searching embeddings:', error);
            throw new Error(`RAG search error: ${error.message}`);
        }
    }

    supportsNetwork = () => true;
}

export const ragActionProvider = () => new RagActionProvider();