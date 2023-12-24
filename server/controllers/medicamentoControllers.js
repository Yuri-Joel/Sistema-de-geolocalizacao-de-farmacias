import { ActualizarMedi, AddMedicamento, ComparaMedicamentos, DeletarMed, DisponivelMed, Medicamento } from "../Models/MedicamentoModel.js"


export const SelMedicamento = async( req,res) =>{

    const {id} = req.params
    const data = await Medicamento(id)

    res.status(200).json({data})

}

export const ComparaMed = async (req, res )=>{

    const {med} = req.body

    const data = await ComparaMedicamentos(med)

    res.status(200).json({data})
}

//gestor

export const AddMed = async (req, res)=>{
   
    
    const add =[
        req.body.farma,
        req.body.mid     
    ]
    const values = [
        req.body.mid,
        req.body.nome,
        req.body.preco,
        req.body.data_validade,
        req.body.informacoes,
        req.body.tipo,
        req.body.imagem_path,
        req.body.disponibilidade
    ]

    const data = await AddMedicamento(values,add)

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
    const {dispo}=  req.body
    
    const data = await DisponivelMed(dispo,id)
    
    res.status(200).json({data})
}

export const DeleMedi = async (req,res)=>{
    const {id} = req.params

    const data = await DeletarMed(id)

    res.status(200).json({data})
}