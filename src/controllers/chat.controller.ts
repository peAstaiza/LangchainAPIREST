import {Request, Response} from "express"
import {pinecone} from './../utils/pinecone-client'
import {makeChain} from './../utils/makechain'
import config from './../config/pinecone_config'

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

//Obtener una respuesta de OpenAI y Pinecone
const getResponse = async (req:Request, res:Response) => {
    try{
        const body = req.body
        if(JSON.stringify(body)=='{}') {
            return res.status(400).json({error:"content-missing"}).end()
        }
        const { question, history } = body;
        if(!question){
            return res.status(400).json({error:"question-missing"}).end()
        }
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
        console.log('response', response.text);
        res.status(200).json(response);/**/
    }
    catch(error){
        console.log(error);
        res.status(500).send('Error').end();
    }
}

export const methods ={
    getResponse
}
