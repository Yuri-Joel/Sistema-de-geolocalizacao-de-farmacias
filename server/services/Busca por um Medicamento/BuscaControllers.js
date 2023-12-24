import { PesquisarMedicamento } from "./BuscaModel.js"


export  const BuscaMedicamento = async(req, res) =>{

   const {search} = req.body

 const  data = await PesquisarMedicamento(search)

   res.status(200).json({data})

}