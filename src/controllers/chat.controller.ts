import {Request, Response} from "express"
import {pinecone} from './../utils/pinecone-client'
import {makeChain} from './../utils/makechain'
import config from './../config/pinecone_config'

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

const getResponse = async (req:Request, res:Response) => {
    try{
        const { question, history } = req.body;
        console.log('Pregunta: ', question);
        const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
        const index = pinecone.Index(config.pineconeIndex);
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({}),
            {
              pineconeIndex: index,
              textKey: 'text',
              namespace: config.pineconeSpace, //namespace comes from your config folder
            },
          );
        //create chain
        const chain = makeChain(vectorStore);
        //Ask a question using chat history
        const response = await chain.call({
            question: sanitizedQuestion,
            chat_history: history || [],
        });
        console.log('response', response);
        res.status(200).json(response);
    }
    catch(error){
        res.status(500);
        console.log(error);
    }
}

export const methods ={
    getResponse
}