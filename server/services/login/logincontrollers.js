import { AdminPrincipal, GestorFarmacia, autenticar } from "./loginModel.js";
import { VerficarGestorFarmacia } from "../../Models/SubgestorModels.js";


export const Verificacao = async (req, res)=>{

    const {email} = req.body
    const {senha} = req.body

const resultadoUsuario = await autenticar(email, senha,'usuarios');

if (!resultadoUsuario.erro) {
    res.cookie('token', resultadoUsuario)
  return res.status(200).json({status: "Sucess", tipo: "usuario", id: resultadoUsuario});
}

// Autenticar gestor
const resultadoGestor = await autenticar(email, senha, 'gestores'); 

if (!resultadoGestor.erro) {
      res.cookie('token', resultadoGestor)

      const farma = await GestorFarmacia(resultadoGestor) ;
      const {id} = farma[0];
  return res.status(200).json({status: "Sucess", tipo: "gestor", id: resultadoGestor, farmacia: id});
}
//Autenticar Subgestor 

const resultadoSubGestor = await autenticar(email, senha, 'subgestores');

if (!resultadoSubGestor.erro) {
    res.cookie('token', resultadoGestor)
    const result = await VerficarGestorFarmacia(resultadoSubGestor)
    const {id} = result[0]
    const { farmacia_id } = result[0];
return res.status(200).json({status: "Sucess", tipo: "subgestor", id: resultadoSubGestor, farmacia: farmacia_id, idGestor: id});
}

// Autenticar administrador
const resultadoAdministrador = await autenticar(email, senha, 'administradores');

if (!resultadoAdministrador.erro) {
    res.cookie('token', resultadoAdministrador)
    const result = await AdminPrincipal(resultadoAdministrador)
    const { administrador_principal } = result[0]
    if(administrador_principal == false){
         return res.status(200).json({status: "Sucess", tipo: "admin", id: resultadoAdministrador});
    } 
    else {
        return res.status(200).json({status: "Sucess", tipo: "adminPrincipal", id: resultadoAdministrador});
    }
}
// Se não encontrado em nenhuma das tabelas, retorne uma mensagem de erro
res.status(200).json({ status: 'Credenciais inválidas' });
}
