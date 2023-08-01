import {Router} from "express"
import {methods as chatController} from './../controllers/chat.controller'
import bodyParser from 'body-parser'

const router = Router();

router.get("/",(req,res)=>{
    res.send("Este es una solicitud get")
});

router.post("/",bodyParser.json(),chatController.getResponse);

export default router;