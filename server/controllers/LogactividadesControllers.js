import { addLog, ObterLog } from "../Models/logactividadesModels.js"


export const criaLog = async (req, res) =>{

    const {id} = req.params
    const values = [
        req.usuario,
        req.caminho
    ]
    const data = await addLog(values,id)
    res.status(200).json({data})
}

export const ObterLogactividades = async (req, res) =>{

    const {id} = req.params
   
    const data = await ObterLog(id)

    res.status(200).json({data})
}

