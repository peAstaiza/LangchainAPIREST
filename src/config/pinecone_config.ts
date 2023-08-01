import {config} from "dotenv"

config();

export default{
    openAIKey: process.env.OPENAI_API_KEY||"",
    pineconeKey: process.env.PINECONE_API_KEY||"",
    pineconeEnviroment: process.env.PINECONE_ENVIRONMENT||"",
    pineconeIndex: process.env.PINECONE_INDEX_NAME||"",
    pineconeSpace: process.env.PINECONE_SPACE_NAME||""
}