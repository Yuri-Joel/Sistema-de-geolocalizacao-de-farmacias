import { Actualiadmin, ObteradminId, newadmin } from "../Models/AdministradoresModels.js"



export const ObterAdmin = async (req,res)=>{
          const {id} = req.params
           const data = await ObteradminId(id)
     res.status(200).json({data})
}


export const CriarAdmin = async (req,res)=> {
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha  
    ];

    const data = await newadmin(values)
    res.status(200).json({data})
}
export const Actualizaradmin = async (req,res)=> {
  const {id} = req.params;
  
    const values =[
        req.body.nome,
        req.body.email,
        req.body.senha,  
    ];
    const data = await Actualiadmin(values,id)
   
    res.status(200).json({data})
}
