import { ActuaGestor, deleteGestor, CGestores, newGestores, TodosGestores, ObtergestorId} from "../Models/gestoresModels.js"
import { hashSenha } from "./usuarioControllers.js"


export const ContarGestores = async(_,res) =>{
    const data = await CGestores()
    res.status(200).json({data})
}

export const CTodosGestores = async (_,res)=>{
    const data = await  TodosGestores()
    
        res.status(200).json({data})
   
}

export const ObterGes = async (req,res)=>{
          const {id} = req.params
           const data = await ObtergestorId(id)
     res.status(200).json({data})
}


export const CriarGestor = async (req,res)=> {
    const senha = await hashSenha(req.body.senha)
    const values =[
        req.body.nome,
        req.body.email,
        req.body.nomeusuario,
        senha,
        req.body.telefone,
        req.body.farmacia
    ];

    const data = await newGestores(values)
    res.status(200).json({data})
}
export const ActualizarGestor = async (req,res)=> {
  const {id} = req.params;
  const senha = await hashSenha(req.body.senha)
    const values =[
        req.body.nome,
        req.body.email,
        senha,
        req.body.telefone,
        req.body.farmacia 
    ];
    const data = await ActuaGestor(values,id)
   
    res.status(200).json({data})
}


export const DeletaGestor = async (req,res)=> {
    const {id} = req.params
    const data = await deleteGestor(id)
   
    res.status(200).json({data})
}

