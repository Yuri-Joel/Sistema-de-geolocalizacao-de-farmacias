import { ActualizarMedi, AddMedicamento, ComparaMedicamentos, DeletarMed, DisponivelMed, GraficoMedfavoritosFarma, Medicamento, ObterMedid, farmamedicamentos, totalFavoritosMedi, totalMedicamento } from "../Models/MedicamentoModel.js"


export const SelMedicamento = async( req,res) =>{

    const {id} = req.params
    const {usuario} = req.params;
    const data = await Medicamento(usuario,id)

    res.status(200).json({data})

}


export const farmaciaMed = async (req, res)=>{
    const {id} = req.params

  
    const data = await farmamedicamentos(id);
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

//gestor

export const AddMed = async (req, res)=>{
   
 //add medicamento 

    const { farma } = req.body;
    const imagePath = 'image_Product/' + req.file.filename;

    const values = [
        req.body.nome,
        req.body.preco,
        req.body.data_validade,
        req.body.informacoes,
        req.body.tipo,
        imagePath,
        req.body.disponibilidade
    ]
    const data = await AddMedicamento(values,farma)

    res.status(200).json({data})
}

export const ActuaMedi = async (req,res)=>{
    const {id}= req.params
    const imagePath = 'image_Product/' + req.file.filename;
    const values = [
        req.body.nome,
        req.body.preco,
        req.body.data_validade,
        req.body.informacoes,
        req.body.tipo,
        imagePath,
        req.body.disponibilidade
    ]
        const data = await ActualizarMedi(values,id)
        res.status(200).json({data})
}

export const DispoMed= async (req,res) =>{

    const {id}= req.params
    const {dispo} =  req.body

    const data = await DisponivelMed(dispo,id)
    
    res.status(200).json({data})
}

export const DeleMedi = async (req,res)=>{
    const {id} = req.params

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
