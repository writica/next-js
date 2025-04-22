import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import natural from 'natural';

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Vectorize function - tokenizes and stems text
function vectorize(text) {
  if (!text || typeof text !== 'string') return [];
  return tokenizer.tokenize(text.toLowerCase())
    .map(word => stemmer.stem(word));
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  const intersection = vecA.filter(word => vecB.includes(word));
  return intersection.length / Math.sqrt(vecA.length * vecB.length) || 0;
}

export async function GET(request) {
  try {
    // Extract query parameter from URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const total = searchParams.get('total') || 5; // Default to 5 if not provided
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Load the knowledge base
    const dataFilePath = path.join(process.cwd(), 'embedding_docs/output', 'all.json');
    
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: 'Embedding data not found, run the extraction first' },
        { status: 404 }
      );
    }
    
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    
    // Create query vector
    const queryVector = vectorize(query);

    console.log('query:', query);
    console.log('Query Vector:', queryVector);
    
    // Find similar documents
    const results = data.map(doc => ({
      id: doc.id || 'unknown',
      content: doc.content,
      metadata: doc.metadata || {},
      score: cosineSimilarity(queryVector, vectorize(doc.content))
    }))
    .filter(doc => doc.score > 0) // Only return relevant results
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, total); // Limit to top 5 results
    
    return NextResponse.json({
      query,
      results,
      totalResults: results.length
    });
  } catch (error) {
    console.error('Error searching embeddings:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
