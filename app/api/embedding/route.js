import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const inputDir = path.join(process.cwd(), 'embedding_docs/input');

    // Check if directory exists
    if (!fs.existsSync(inputDir)) {
      return NextResponse.json(
        { error: 'Directory not found', path: inputDir },
        { status: 404 }
      );
    }

    // Read all files in the directory
    const files = fs.readdirSync(inputDir);

    // Read content of each file
    const fileContents = files.map(filename => {
      const filePath = path.join(inputDir, filename);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        return {
          filename,
          content,
          path: filePath
        };
      } catch (err) {
        return {
          filename,
          error: `Failed to read file: ${err.message}`,
          path: filePath
        };
      }
    });

    return NextResponse.json({
      files: fileContents,
      count: files.length,
      directory: inputDir
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
