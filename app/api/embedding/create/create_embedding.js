// import OpenAI from "openai";


export const create = () => {
    // read all embedding_docs/input files

    const inputDir = path.join(process.cwd(), "embedding_docs", "input");
    const files = fs.readdirSync(inputDir);
    files.map((filename) => {
        const filePath = path.join(inputDir, filename);
        try {
            const content = fs.readFileSync(filePath, "utf8");
            return {
                filename,
                content,
            }
        } catch (err) {
            return {
                filename,
                error: `Failed to read file: ${err.message}`,
            };
        }
    }
    );
};