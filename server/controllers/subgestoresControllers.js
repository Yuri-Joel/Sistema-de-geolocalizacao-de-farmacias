import { ActuaSubGestor, deleteSubGestor, newSubGestores, TodosSubGestores, ObterSubgestorId, CGestores, ObterSubgestorgestor} from "../Models/SubgestorModels.js"
import { ActuaGestorsenha } from "../Models/gestoresModels.js"
import { EliminarFoto } from "../Models/usuarioModels.js"
import { Verify } from "../services/recuperacao de senha/recuperacaoModel.js"
import { Validateall, hashSenha } from "./usuarioControllers.js"

 
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

export const GetSubGestorId = async (req,res)=>{
          const {id} = req.params
           const data = await ObterSubgestorId(id)
     res.status(200).json({data})

}
export const ObtersubGestorOfGestor = async(req, res)=>{
    
    const { id } = req.params
    const data = await ObterSubgestorgestor(id)
    res.status(200).json({ data })

}

export const CriarSubGestor = async (req,res)=> {
    const senha = await hashSenha(req.body.senha)
   
   
   
    const {nome,email, telefone,gestor} = req.body
   
    const result = await Verify(email)
    if (!result || result.length === 0) {
    const validar = await Validateall(nome,email,senha, telefone)

    if(validar){

        const values = [
            nome,
            email,
            senha,
            telefone,
            gestor
        ]
        const data = await newSubGestores(values)
        res.status(200).json({ data })
    } else{
        res.status(200).json({ data: "ERRO ao cadastrar!" })
    }} else{
        return res.status(200).json({ data: 'E-mail Já Existe!' });
    }
    
}
export const ActualizarSubGestor = async (req,res)=> {
  const {id} = req.params;
    const values =[
        req.body.nome,
        req.body.email,
    ];
    const data = await ActuaSubGestor(values,id)
   
    res.status(200).json({data})
}

export const ActualizarSubSenha = async(req, res)=>{
    const { id } = req.params;
    const senha = await hashSenha(req.body.senha)
    
    const data = await ActuaGestorsenha("subgestores",senha, id)

    res.status(200).json({ data })
}


export const DeletaSubGestor = async (req,res)=> {
    const {id} = req.params
    const data = await deleteSubGestor(id)
   
    res.status(200).json({data})
}

export const DeletarFotoSubGestor = async(req, res)=>{

    const {id} = req.params;
    const data = EliminarFoto("subgestores", id)
    res.status(200).json({ data })

}