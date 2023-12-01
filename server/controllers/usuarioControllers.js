import { ActualizarUsuarioId, CriarUsuario, ObterUsuarioId, TodosUsuarios, TodosUsuariosNumeros, deleteUsuarios} from "../Models/usuarioModels.js";

export const TodosU = async (_,res)=>{
    const data = await  TodosUsuarios()
    
        res.status(200).json({data})
   
}

export const ContarUsuarios = async (_,res)=>{
    const data = await TodosUsuariosNumeros()
    const d = data[0].total
    res.status(200).json({total: d})
      

}

export const ObterU = async (req,res)=>{
          const {id} = req.params
           const data = await ObterUsuarioId(id)
     res.status(200).json({data})
}


export const CriarU = async (req,res)=> {
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha  
    ];

    const data = await CriarUsuario(values)
    res.status(200).json({data})
}
export const ActualizarU = async (req,res)=> {
  const {id} = req.params;
  
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha,  
    ];
    const data = await ActualizarUsuarioId(values,id)
   
    res.status(200).json({data})
}


export const DeletaU = async (req,res)=> {
    const {id} = req.params
    const data = await deleteUsuarios(id)
   
    res.status(200).json({data})
}

