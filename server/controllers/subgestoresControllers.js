import { ActuaSubGestor, deleteSubGestor, newSubGestores, TodosSubGestores, ObterSubgestorId, CGestores, ObterSubgestorgestor} from "../Models/SubgestorModels.js"
import { hashSenha } from "./usuarioControllers.js"

 
export const ContarGestores = async(req,res) =>{
    const {id}= req.params
    const data = await CGestores(id)
    const total = data[0].total
    res.status(200).json({total})
} 

export const CTodosSubGestores = async (_,res)=>{
    const data = await  TodosSubGestores()
    
        res.status(200).json({data})
   
}

export const ObterSubGes = async (req,res)=>{
          const {id} = req.params
           const data = await ObterSubgestorId(id)
     res.status(200).json({data})
}
export const ObtersubGestor = async(req, res)=>{
    
    const { id } = req.params
    const data = await ObterSubgestorgestor(id)
    res.status(200).json({ data })

}

export const CriarSubGestor = async (req,res)=> {
    const senha = await hashSenha(req.body.senha)
    const values =[
        req.body.nome,
        req.body.email,
        senha,
        req.body.telefone,
        req.body.gestor
    ];

    const data = await newSubGestores(values)
    res.status(200).json({data})
}
export const ActualizarSubGestor = async (req,res)=> {
  const {id} = req.params;
  const senha = await hashSenha(req.body.senha)
    const values =[
        req.body.nome,
        req.body.email,
        senha,
        req.body.telefone,
        req.body.farmacia 
    ];
    const data = await ActuaSubGestor(values,id)
   
    res.status(200).json({data})
}


export const DeletaSubGestor = async (req,res)=> {
    const {id} = req.params
    const data = await deleteSubGestor(id)
   
    res.status(200).json({data})
}

