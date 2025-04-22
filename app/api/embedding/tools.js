import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
// import { fileURLToPath } from 'url';

// Get current file directory when using ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Update paths to use embedding_docs folders
// const inputDir = path.join(process.cwd(), "embedding_docs", "input");
const outputDir = path.join(process.cwd(), "embedding_docs", "output");

// Chunk settings
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// Ensure directory exists
export async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch (error) {
    console.log(error)
    await fs.mkdir(dir, { recursive: true });
  }
}

// Create overlapping chunks from text
export function createChunks(text) {
  const chunks = [];
  // Replace newlines with spaces to make text more continuous
  const cleanText = text.replace(/\n/g, " ");

  // Use the constants defined above instead of hardcoded values
  for (let i = 0, j = Math.round(cleanText.length / CHUNK_SIZE) + 1; i < j; i++) {
    const data = cleanText.substr(
      Math.max(0, i * CHUNK_SIZE - CHUNK_OVERLAP),
      CHUNK_SIZE
    );
    chunks.push(data);
  }
  return chunks;
}

// Extract PDF text and create chunks
export async function extractPDF(pdfPath, chunk = true) {
  try {
    const pdfFile = await fs.readFile(pdfPath);
    const data = await pdfParse(pdfFile);
    const text = data.text;
    const fileName = path.basename(pdfPath, ".pdf");

    // Save the full text
    const textOutputPath = path.join(outputDir, `${fileName}.txt`);
    await fs.writeFile(textOutputPath, text);

    // Create chunks only if chunking is requested
    let chunks = [];
    if (chunk) {
      chunks = createChunks(text);
      const jsonOutputPath = path.join(outputDir, `${fileName}.json`);
      await fs.writeFile(jsonOutputPath, JSON.stringify({ chunks }, null, 2));
      console.log(`Created ${chunks.length} chunks for ${fileName}.pdf`);
    } else {
      console.log(`Skipped chunking for ${fileName}.pdf as requested`);
    }

    console.log(
      `✅ Successfully processed: ${fileName}.pdf → ${fileName}.txt${chunk ? ` and ${fileName}.json` : ''}`
    );

    return { fileName, text, chunks };
  } catch (error) {
    console.error(
      `❌ Error processing ${path.basename(pdfPath)}: ${error.message}`
    );
    return null;
  }
}

// async function main() {
//   try {
//     // Ensure input and output directories exist
//     await ensureDir(inputDir);
//     await ensureDir(outputDir);

//     // Get all PDF files from input directory
//     const files = await fs.readdir(inputDir);
//     const pdfFiles = files.filter(
//       (file) => path.extname(file).toLowerCase() === ".pdf"
//     );

//     if (pdfFiles.length === 0) {
//       console.log(
//         `No PDF files found in ${inputDir}. Please add PDF files to process.`
//       );
//       return;
//     }

//     console.log(`Found ${pdfFiles.length} PDF file(s) to process...`);

//     // Process all PDF files
//     const extractionPromises = pdfFiles.map((file) =>
//       extractPDF(path.join(inputDir, file))
//     );

//     const results = await Promise.all(extractionPromises);
//     const validResults = results.filter((result) => result !== null);

//     console.log(
//       `All done! Processed ${validResults.length} file(s). Created text files and JSON chunks in ${outputDir}`
//     );

//     // Optional: create a summary of all chunks
//     const allChunks = {};
//     validResults.forEach((result) => {
//       allChunks[result.fileName] = result.chunks;
//     });

//     if (validResults.length > 0) {
//       const summaryPath = path.join(outputDir, "all_chunks.json");
//       await fs.writeFile(summaryPath, JSON.stringify(allChunks, null, 2));
//       console.log(`📊 Created summary of all chunks at ${summaryPath}`);
//       return allChunks;
//     }
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// }

// main();
