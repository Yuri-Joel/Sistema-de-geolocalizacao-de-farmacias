import { AddNewsms, DeleteMensagens, MostrarMensagens } from "../Models/MensagensModels.js"



export const MostraSMS = async (_, res)=>{

    const data = await MostrarMensagens();
    
   
    res.status(200).json({data})
}

export const AddNovasSMS = async (req,res)=>{
    
    const {usuario,email,texto } = req.body


    const data = await AddNewsms([usuario, texto, email]);



    res.status(200).json({data})
}

 export const DeleteSMS = async (req, res) => {

    const {id} = req.params

    const data = await DeleteMensagens(id);
    res.json(data)
}
