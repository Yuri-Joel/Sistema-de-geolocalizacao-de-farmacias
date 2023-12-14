import express from 'express'
import { Verificação, verifyUser } from './logincontrollers.js';


const routerL = express.Router();

routerL.post("/login", Verificação)

routerL.get("/verificar", verifyUser, (req,res)=>{
    return res.json({status: "Sucess", nome: req.nome})
})


routerL.get("/logout", (_, res)=>{
    res.clearCookie('token');
    return res.json({status: "Sucess"})
})
export default routerL;