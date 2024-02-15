import { ActualizarFarmaciaAdmin, ActualizarFarmacias, ContarFarmacias, CriarNewFarmacia, DeleteFarmacia, FarmaciaAberta, ObterFarmaciaId, Todasfarmacias } from "../Models/farmaciaModels.js"



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
  const hora = "24h"
    const values = [
        req.body.nome,
        req.body.nif,
        req.body.telefone,
        req.body.email,
        req.body.endereco,
        req.body.latitude,
        req.body.longitude,
        hora
    ]
    const data = await CriarNewFarmacia(values)
    res.json({data})
}

export const ActualizarFarma = async (req,res)=>{
    
    const {id}= req.params
    const values = [
        req.body.Nomefarma,
        req.body.Niffarma,
        req.body.Email,
        req.body.Telefonefarma,
        req.body.Horariofarma
    ]
    const data = await ActualizarFarmacias(values,id)
    res.json({data})
}

export const ActualizarFarmaAdmin = async(req, res) =>{
    const { id } = req.params
    const values = [
        req.body.endereco,
        req.body.latitude,
        req.body.longitude
    ]
    const data = await ActualizarFarmaciaAdmin(values, id)
    res.json({ data })

}



export const FarmaciaOpen = async(req, res)=> {
    const {farma} = req.params;
    const {value} = req.body
    
    const data =  await  FarmaciaAberta(value, farma);

    if(value == true){
        return res.status(200).json({data: data + " Aberta"})
    } else {
        res.status(200).json({ data: data +" fechada" })
    }
   
}
export const DeleteFarma = async (req,res)=>{
    const {id} = req.params
    const data = await DeleteFarmacia(id)
    res.json({data})
}
