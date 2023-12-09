import  Express  from "express";
import { RecuperaSenha, RedefinirSenha } from "./recuperacaoControl.js";

const routerU = Express.Router()

routerU.post("/recuperar", RecuperaSenha)

routerU.post("/redefinir-senha/:token", RedefinirSenha)

export default routerU;