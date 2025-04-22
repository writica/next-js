import fs from "fs";
import path from "path";
import natural from "natural";

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

export interface SearchResult {
  id: string;
  content: string;
  metadata: Record<string, any>;
  score: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
}

/**
 * Tokenizes and stems text for vector comparison
 */
export function vectorize(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  return tokenizer.tokenize(text.toLowerCase())
    .map(word => stemmer.stem(word));
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: string[], vecB: string[]): number {
  const intersection = vecA.filter(word => vecB.includes(word));
  return intersection.length / Math.sqrt(vecA.length * vecB.length) || 0;
}

/**
 * Performs a semantic search against the embedded documents
 */
export async function performSearch(query: string, total: number = 5): Promise<SearchResponse> {
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
      .filter((doc: SearchResult) => doc.score > 0)
      .sort((a: SearchResult, b: SearchResult) => b.score - a.score)
      .slice(0, total);
    
    return {
      query,
      results,
      totalResults: results.length
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error searching embeddings:', error);
    throw new Error(`Search error: ${error.message}`);
  }
}
