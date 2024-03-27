import { AddEstatistica } from "../Estatistica/EstatisticaModel.js"
import { PesquisarMedicamento } from "./BuscaModel.js"


export  const BuscaMedicamento = async(req, res) =>{

   const { Municipio, Provincia,search, usuario, idfarma}= req.body;
   const mes = new Date().getMonth()+1;

   const  data = await PesquisarMedicamento(usuario,search, idfarma);

    await AddEstatistica(search, [mes, Municipio, Provincia,search]);
   

   res.status(200).json({data})

}