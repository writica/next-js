import { OpenAI } from 'openai';
import dotenv from 'dotenv';


const ENV = dotenv.config().parsed;
const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

export async function getEmbedding(text) {
    try {
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: text
        });
        return response.data[0].embedding;
    } catch (error) {
        console.error('Error fetching embedding:', error);
    }
}

export async function insertEmbedding(text, database) {
    try {
        const embedding = await getEmbedding(text);
        await database.insert({ text, embedding });
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}
