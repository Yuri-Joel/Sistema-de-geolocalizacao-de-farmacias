import { ActualizarMedi, AddMedicamento, ComparaMedicamentos, DeletarMed, DisponivelMed, GraficoMedfavoritosFarma, Medicamento, ObterMedid, UploadImageMedicamento, farmamedicamentos, farmamedicamentosTop, getMedicamentoDeletado, totalFavoritosMedi, totalMedicamento } from "../Models/MedicamentoModel.js"
import {  NotificacaoSubgestor } from "../Models/NotificacoesModel.js";


export const SelMedicamento = async( req,res) =>{

    const {id} = req.params
    const {usuario} = req.params;
    const data = await Medicamento(usuario,id);
    res.status(200).json({data})

}

export const farmaciaMed = async (req, res)=>{
    const {id} = req.params

  
    const data = await farmamedicamentos(id);
    res.status(200).json({ data })
}

export const farmaciaMedTop = async (_, res) => {
 

    const data = await farmamedicamentosTop();
    res.status(200).json({ data })
}

export const ObtermedicamentoId = async(req, res)=>{

    const {id} = req.params;
    const data = await ObterMedid(id);
    res.status(200).json({ data })

}

export const ComparaMed = async (req, res )=>{

    const {med} = req.params

    const data = await ComparaMedicamentos(med)
    res.status(200).json({data})
}

// gestor

export const AddMed = async (req, res)=>{
   
 //add medicamento 

    const {farma, subgestor} = req.body;
    const imagePath = 'image_Product/' + req.file.filename;
const {nome, preco, data_validade, informacoes, tipo, disponibilidade} = req.body;

       const  dados = [
            nome,
            preco,
            data_validade,
            informacoes,
            tipo,
            imagePath,
            disponibilidade
        ]
        const data = await AddMedicamento(dados, farma)
       
if((subgestor != "null")){
    const result = await NotificacaoSubgestor([subgestor, data, "Produto cadastrado", "gestor"]);
    console.log(result) 
}
        res.status(200).json({data : "medicamento adicionado"})
  
}

export const ActuaMedi = async (req,res)=>{
    const {id}= req.params
    const {subgestor, produto,nome, preco, data_validade, informacoes, tipo, disponibilidade } = req.body;
   

   
   console.log(subgestor);
    if(subgestor != null ) {
        const result = await NotificacaoSubgestor([subgestor, produto, "produto actualizado ", "gestor"])
        console.log(result)
    }
   
        const dados = [
            nome,
            preco,                   
            data_validade,
            informacoes,
            tipo,
            disponibilidade
        ]
        const data = await ActualizarMedi(dados, id)

        res.status(200).json({ data })

}

export const ActualizarImagemMed = async(req,res)=>{
    const {subgestor,id} = req.body;
    const imagePath = 'image_Product/' + req.file.filename;
    
    
    console.log(subgestor)
    if (subgestor != "null") {

        const result = await NotificacaoSubgestor([subgestor, id, "foto actualizada ", "gestor"])
        console.log(result)
    }
 

    const data = await UploadImageMedicamento(imagePath, id)
    res.status(200).json({ data })
}
export const DispoMed= async (req,res) =>{

    const {id}= req.params
    const {dispo} =  req.body

    const data = await DisponivelMed(dispo,id)
    
    res.status(200).json({data})
}


export const DeleMedi = async (req,res)=>{
    const {id, subgestor} = req.params

    if (subgestor != "null") {
        const medicamento = await getMedicamentoDeletado(id)
        console.log(medicamento[0].nome);
        const result = await NotificacaoSubgestor([subgestor,id, `Item deletado ${medicamento[0].nome} `, "gestor"])
        console.log(result)
    }
    const data = await DeletarMed(id)

    res.status(200).json({data})
}

export const TotalMedi = async(req,res)=>{

    const {id} = req.params

    const data = await totalMedicamento(id)
    const total = data[0].total
    res.status(200).json({total})

}

export const TotalFavMedi = async(req,res)=>{

    const {id} = req.params

    const data = await totalFavoritosMedi(id)
    const total = data[0].total
    res.status(200).json({total})

}

export const GraficomedFarma = async (req, res) => {
    const {id} = req.params

    const data = await GraficoMedfavoritosFarma(id);
    res.json({data})

}
