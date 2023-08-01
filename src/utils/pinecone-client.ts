import { PineconeClient } from '@pinecone-database/pinecone';
import config from './../config/pinecone_config' 

if (!config.pineconeEnviroment || !config.pineconeKey) {
  throw new Error('Pinecone environment or api key faltan');
}

async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: config.pineconeEnviroment ?? '', //this is in the dashboard
      apiKey: config.pineconeKey ?? '',
    });
    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export const pinecone = await initPinecone();
