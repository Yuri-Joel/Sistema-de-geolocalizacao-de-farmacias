import { AddNewsms, DeleteMensagens, MostrarMensagens } from "../Models/MensagensModels.js"



export const MostraSMS = async (_, res)=>{

    const data = await MostrarMensagens();
    
   
    res.status(200).json({data})
}

export const AddNovasSMS = async (req,res)=>{
    
const values = [
    req.body.usuario,
    req.body.texto,
    
]
const data = await AddNewsms(values);

    res.status(200).json({data})
}

 export const DeleteSMS = async (req, res) => {

    const {id} = req.params

    const data = await DeleteMensagens(id);
    res.json(data)
}