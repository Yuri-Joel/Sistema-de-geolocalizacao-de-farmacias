import { AddEstatistica } from "../Estatistica/EstatisticaModel.js";
import { BuscaQualquerMedicamento, BuscaQualquerMedicamentoRealTime } from "./BuscaModel.js";


export const searchMedicamento = async(req, res)=>{

const {termo, lng, lat, Municipio, Provincia}= req.body;

const raio = 50;

const mes = new Date().getMonth() + 1

const data = await BuscaQualquerMedicamento(termo, lat,lng, raio)

await AddEstatistica(termo, [mes,Municipio, Provincia, termo])

res.status(200).json({data})
}


export const searchMedicamentoRealTime = async(req , res)=>{
    const {termo} =req.body
    const data = await BuscaQualquerMedicamentoRealTime(termo);
    res.status(200).json({data})
}
