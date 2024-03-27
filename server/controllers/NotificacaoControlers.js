import { DeleteNoti, Notificacao, ObterNotificacao, ObterNotificacaoGestor, ShowNotiAdmin } from "../Models/NotificacoesModel.js"



export const ControlNoti = async(req, res)=>{


    const {texto, tipo} = req.body
const values = [
    texto,
    tipo
]
    const data = await Notificacao(values)

    res.status(200).json({data})
}
export const ObterNotiAdmin = async (_,res)=>{
   
    const data = await ShowNotiAdmin()

    res.status(200).json({data})
}

export const ObterNoti = async(req, res)=>{
 
    const {tipo} = req.params
    const data = await ObterNotificacao(tipo)

    res.status(200).json({data})
}


export const ObterNotiGestor = async(req, res)=>{
 
    const {id} = req.params
    const data = await ObterNotificacaoGestor(id)

    res.status(200).json({data})
}

export const DeleteNotificacoes =async (req, res)=>{

    const {id}= req.params;

    const data = await DeleteNoti(id)
    res.status(200).json({data})
}