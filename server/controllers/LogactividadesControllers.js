import { addLog, ObterLog } from "../Models/logactividadesModels.js"


export const criaLog = async (req, res) =>{

    const {tipo} = req.body
    const values = [
        req.body.usuario,
        req.body.caminho
    ]
    const data = await addLog(values,tipo)
    res.status(200).json({data})
}

export const ObterLogactividades = async (req, res) =>{

    const {tipo} = req.params
    const {id} = req.params
   
    const data = await ObterLog(tipo,id)

    res.status(200).json({data})
}

