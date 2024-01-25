import { PesquisarMedicamento } from "./BuscaModel.js"


export  const BuscaMedicamento = async(req, res) =>{

   const {search} = req.params
   const {usuario} = req.params
   const {idfarma} = req.params

 const  data = await PesquisarMedicamento(usuario,search, idfarma)

   res.status(200).json({data})

}