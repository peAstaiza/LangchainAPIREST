import {Router} from "express"
import {methods as chatController} from './../controllers/chat.controller'

const router = Router();

router.get("/",(req,res)=>{
    res.send("Este es una solicitud get")
});

router.post("/",chatController.getResponse);

export default router;