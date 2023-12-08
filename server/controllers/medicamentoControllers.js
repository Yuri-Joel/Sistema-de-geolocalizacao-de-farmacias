import { ActualizarMedi, AddMedicamento, ComparaMedicamentos, DeletarMed, DisponivelMed, Medicamento } from "../Models/MedicamentoModel.js"


export const SelMedicamento = async( req,res) =>{

    const {id} = req.params
    const data = await Medicamento(id)

    res.status(200).json(data)

}

export const ComparaMed = async (req, res )=>{

    const {id} = req.params

    const data = await ComparaMedicamentos(id)

    res.status(200).json(data)
}

//gestor

export const AddMed = async (req, res)=>{
    const mId = req.body.medid
    const farmaId = req.body.farmaid
    const values = [
        req.body.nome,
        req.body.preco,
        req.body.data_validade,
        req.body.informacoes,
        req.body.tipo,
        req.body.imagem_path,
        req.body.disponibilidade
    ]

    const data = await AddMedicamento(mId,values,farmaId)

    res.status(200).json({data})
}

export const ActuaMedi = async (req,res)=>{
    const {id}= req.params

    const values = [
        req.body.nome,
        req.body.preco,
        req.body.data_validade,
        req.body.informacoes,
        req.body.tipo,
        req.body.imagem,
        req.body.dispo
    ]
        const data = await ActualizarMedi(values,id)
        res.status(200).json({data})
}

export const DispoMed= async (req,res) =>{

    const {id}= req.params
    const values =  req.body.nome
    
    const data = await DisponivelMed(values,id)
    
    res.status(200).json({data})
}

export const DeleMedi = async (req,res)=>{
    const {id} = req.params

    const data = await DeletarMed(id)

    res.status(200).json({data})
}