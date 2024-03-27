import { ObterEstatisticasMunicipio, ObterEstatisticasProvince, PagamentPay } from "./EstatisticaModel.js"




export const GetProvince = async(_, res)=>{



    const data = await ObterEstatisticasProvince()

    res.status(200).json({data})

}

export const getMunicipe = async(_, res)=>{

    const data = await ObterEstatisticasMunicipio()

    res.status(200).json({data})

}
export const paypalPagament = async(req,res)=>{

    const {valor, id}= req.body
    const data = await PagamentPay(valor, id)

    res.status(200).json({ data })
}