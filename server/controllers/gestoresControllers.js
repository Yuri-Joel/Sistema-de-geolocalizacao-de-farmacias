import { ActuaGestor, deleteGestor, Gestores, newGestores, TodosGestores, ObtergestorId} from "../Models/gestoresModels"


export const ContarGestores = async(_,res) =>{
    const data = await TodosGestores()
    res.status(200).json({data})
}

export const TodosGestores = async (_,res)=>{
    const data = await  Gestores()
    
        res.status(200).json({data})
   
}

export const ObterGes = async (req,res)=>{
          const {id} = req.params
           const data = await ObtergestorId(id)
     res.status(200).json({data})
}


export const CriarGestor = async (req,res)=> {
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha  
    ];

    const data = await newGestores(values)
    res.status(200).json({data})
}
export const ActualizarGestor = async (req,res)=> {
  const {id} = req.params;
  
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha,  
    ];
    const data = await ActuaGestor(values,id)
   
    res.status(200).json({data})
}


export const DeletaGestor = async (req,res)=> {
    const {id} = req.params
    const data = await deleteGestor(id)
   
    res.status(200).json({data})
}

