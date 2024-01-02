import  Express  from "express";
import { RecuperaSenha, RedefinirSenha,AdicionadoNovaSenha } from "./recuperacaoControl.js";

const routerU = Express.Router()

routerU.post("/recuperar", RecuperaSenha)

routerU.post("/redefinir-senha", RedefinirSenha)

routerU.post("/novasenha", AdicionadoNovaSenha)

export default routerU;