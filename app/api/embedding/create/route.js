import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { extractPDF } from '../tools';
// import dotenv from 'dotenv';

// const ENV = dotenv.config().parsed;
// const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

const CHUNK = false; // Toggle for chunking functionality
const inputDir = path.join(process.cwd(), 'embedding_docs/input');
// const outputDir = path.join(process.cwd(), 'embedding_docs/output');

export async function GET() {
  try {

    // Check if directory exists
    if (!fs.existsSync(inputDir)) {
      return NextResponse.json(
        { error: 'Directory not found', path: inputDir },
        { status: 404 }
      );
    }

    // Read all files in the directory
    const files = fs.readdirSync(inputDir);

    // Process each file and await the results properly
    const fileContentPromises = files.map(async (filename) => {
      const filePath = path.join(inputDir, filename);
      try {
        const content = await extractPDF(filePath, CHUNK);
        console.log(`Extracted content from ${filename}`);
        return {
          filename,
          content
        };
      } catch (error) {
        console.error(`Error extracting content from ${filename}:`, error);
        return {
          filename,
          error: error.message
        };
      }
    });

    // Wait for all promises to resolve
    const fileContents = await Promise.all(fileContentPromises);

    let data = [];

    console.log(fileContents);
    Array.from(fileContents).forEach(async (file) => {
      file.content.chunks.forEach(async (chunk) => {
        data.push(chunk);
      });
    });

    let tempData = [];
    let index = 1;
    
    if (CHUNK) {
      // Process with chunking (original behavior)
      fileContents.forEach((file) => {
        file.content.chunks.forEach((chunk) => {
          tempData.push({
            id: index++,
            content: chunk,
          });
        });
      });
    } else {
      // Process without chunking - save whole documents
      fileContents.forEach((file) => {
        tempData.push({
          id: index++,
          content: file.content.text, // Using the full document text instead of chunks
          filename: file.filename
        });
      });
    }

    // save data to json file
    const outputFilePath = path.join(process.cwd(), 'embedding_docs/output', 'all.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(tempData, null, 2), 'utf-8');
    console.log(`Data saved to ${outputFilePath}`);

    return NextResponse.json({
      data: tempData,
    });

  } catch (error) {
    console.error('Error processing files:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
