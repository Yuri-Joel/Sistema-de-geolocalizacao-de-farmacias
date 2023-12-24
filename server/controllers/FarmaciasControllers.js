import { ActualizarFarmacias, ContarFarmacias, CriarNewFarmacia, DeleteFarmacia, ObterFarmaciaId, Todasfarmacias } from "../Models/farmaciaModels.js"



export const ContaFarma = async (_,res)=>{
    
    const data = await ContarFarmacias()
    const total = data[0].total; 
    res.status(200).json({total})
}

export const TodasFarma = async (_,res)=>{
    
    const data = await Todasfarmacias()
    res.json({data})
}

export const ObterFarmaID = async (req,res)=>{
    const {id} = req.params
    const data = await ObterFarmaciaId(id)
    res.json({data})
}

export const CRiarFarma = async (req,res)=>{
    const values = [
        req.body.nome,
        req.body.nif,
        req.body.telefone,
        req.body.endereco,
        req.body.latitude,
        req.body.longitude,
        req.body.horario_funcionamento
    ]
    const data = await CriarNewFarmacia(values)
    res.json({data})
}

export const ActualizarFarma = async (req,res)=>{
    
    const {id}= req.params
    const values = [
        req.body.nome,
        req.body.nif,
        req.body.telefone,
        req.body.endereco,
        req.body.latitude,
        req.body.longitude,
        req.body.horario_funcionamento
    ]
    const data = await ActualizarFarmacias(values,id)
    res.json({data})
}

export const DeleteFarma = async (req,res)=>{
    const {id} = req.params
    const data = await DeleteFarmacia(id)
    res.json({data})
}
