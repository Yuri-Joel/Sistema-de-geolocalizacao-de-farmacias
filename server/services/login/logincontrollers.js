import jwt from "jsonwebtoken";
import { autenticar } from "./loginModel.js";


export const Verificação = async (req, res)=>{

    const {email} = req.body
    const {senha} = req.body

const resultadoUsuario = await autenticar(email, senha,'usuarios');

if (!resultadoUsuario.erro) {
    res.cookie('token', resultadoUsuario)
  return res.status(200).json({status: "Sucess"});
}

// Autenticar gestor
const resultadoGestor = await autenticar(email, senha, 'gestores');

if (!resultadoGestor.erro) {
      res.cookie('token', resultadoGestor)
  return res.status(200).json({status: "Sucess"});
}

// Autenticar administrador
const resultadoAdministrador = await autenticar(email, senha, 'administradores');

if (!resultadoAdministrador.erro) {
    res.cookie('token', resultadoAdministrador)
  return res.status(200).json({status: "Sucess"});
}

// Se não encontrado em nenhuma das tabelas, retorne uma mensagem de erro
res.status(401).json({ erro: 'Credenciais inválidas' });


}

export const verifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "este usuario não está autenticado"});
    }
    else {
        jwt.verify(token, "yuri",(err,decoded)=>{
            if(err){
                return res.json({Error: "Token não esta correto"});
            } else{
                req.nome = decoded.nome;
                next()
            }
        })
    }
}