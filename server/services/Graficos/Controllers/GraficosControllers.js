import { GraficoFarmaciasTotalMedi, GraficoFavFarmacias, GraficoFavMedicamentos } from "../Models/GraficoModels.js"



export const GraficofavMedi = async(_,res)=>{

    const data = await GraficoFavMedicamentos()
    res.status(200).json({data})


}
export const Graficofavfarma = async(_,res)=>{

    const data = await GraficoFavFarmacias()
    res.status(200).json({data})


}

export const Graficofarmacias = async(_,res)=>{

    const data = await GraficoFarmaciasTotalMedi();

    res.status(200).json({data})
}