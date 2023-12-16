import { ActualizarUsuarioId, CriarUsuario, ObterUsuarioId, TodosUsuarios, TodosUsuariosNumeros, deleteUsuarios} from "../Models/usuarioModels.js";
import { hash } from "bcrypt";

export const hashSenha = async  (senha)=>{
    
        const saltRounds = 10;
      const v  =  hash(senha, saltRounds)

       return v;
   
}


export const TodosU = async (_,res)=>{
    const data = await  TodosUsuarios()
    
        res.status(200).json({data})
   
}

export const ContarUsuarios = async (_,res)=>{
    const data = await TodosUsuariosNumeros()
    const total = data[0].total
    res.status(200).json({total})
      

}

export const ObterU = async (req,res)=>{
          const {id} = req.params
           const data = await ObterUsuarioId(id)
     res.status(200).json({data})
}


export const CriarU = async (req,res)=> {
    const senha = await hashSenha(req.body.senha)
    const values =[
        req.body.nome,
        req.body.email,
        senha
    ];

    const data = await CriarUsuario(values)
    res.status(200).json({status: data})
}
export const ActualizarU = async (req,res)=> {
  const {id} = req.params;
  const senha = await hashSenha(req.body.senha)
  
    const values =[
        req.body.nome,
        req.body.email,
        senha 
    ];
    const data = await ActualizarUsuarioId(values,id)
   
    res.status(200).json({data})
}


export const DeletaU = async (req,res)=> {
    const {id} = req.params
    const data = await deleteUsuarios(id)
   
    res.status(200).json({data})
}

