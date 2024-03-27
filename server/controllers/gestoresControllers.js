import { ActuaGestor, deleteGestor, CGestores, newGestores, TodosGestores, ObtergestorId, Nomefarmacias, ActuaGestorsenha} from "../Models/gestoresModels.js"
import { EliminarFoto } from "../Models/usuarioModels.js"
import { Verify } from "../services/recuperacao de senha/recuperacaoModel.js"
import { Validateall, hashSenha } from "./usuarioControllers.js"


export const ContarGestores = async(_,res) =>{
    const data = await CGestores()
    const total = data[0].total
    res.status(200).json({total})
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
    
  const  { nome, email, nomeusuario, senha, telefone, farmacia} = req.body

    const result = await Verify(email)
    if (!result || result.length === 0) {
       
        const validar = await Validateall(nome,email,senha,telefone);
        if(validar){
            const senha1 = await hashSenha(senha);
             const values =[
      nome,
      email,
      nomeusuario,
      senha1,
      telefone,
      farmacia
    ];

    const data = await newGestores(values)
    res.status(200).json({data})
        } else {
            return res.status(200).json({ data: 'Erro, nos campos!' });
        }
   
} else{
    return res.status(200).json({ data: 'E-mail Já Existe!' });
}
}
export const ActualizarGestor = async (req,res)=> {
  const {id} = req.params;
    const values =[
        req.body.nome,
        req.body.email,
    ];
    const data = await ActuaGestor(values,id)
   
    res.status(200).json({data})
}
export const ActualizarGestorSenha = async (req, res) => {
    const { id } = req.params;
    const senha = await hashSenha(req.body.senha)
    
    const data = await ActuaGestorsenha("gestores",senha, id)

    res.status(200).json({ data })
}


export const DeletaGestor = async (req,res)=> {
    const {id} = req.params
    const data = await deleteGestor(id)
   
    res.status(200).json({data})
}

export const Nomefarma = async(req, res)=>{

    const {id} = req.params
    const data = await Nomefarmacias(id);

    res.status(200).json({data})

}

export const DeletarFotoGestor = (req, res)=>{

    const {id} = req.params;
    const data = EliminarFoto("gestores", id)
    res.status(200).json({ data })
}