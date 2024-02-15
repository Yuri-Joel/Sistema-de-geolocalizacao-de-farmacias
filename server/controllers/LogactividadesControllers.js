import { addLog, Deletar, DeletarTudo, ObterLog } from "../Models/logactividadesModels.js"


export const criaLog = async (req, res) =>{
    
    
    
    const { tipo } = req.body
    if(tipo == 'administrador'){
        const detalhes = "acção realizada pelo administrador"
        const ad = 'administrador'
        const values = [
            ad,
            req.body.usuario,
            req.body.caminho,
            detalhes
        ]
       const data = await addLog(values, tipo)
       return res.status(200).json({data})
    } else if(tipo == 'gestor'){
        const ad = 'gestor'
        const detalhes = "acção realizada pelo gestor"
        const values = [
            ad,
            req.body.usuario,
            req.body.caminho,
            detalhes
        ]
     
        const data = await addLog(values, tipo);

     return res.status(200).json({data})

    } else  if(tipo == "usuario"){
        const detalhes = "acção realizada pelo usuario normal"
        const ad = 'usuario'
        const values = [
            ad,
            req.body.usuario,
            req.body.caminho,
            detalhes
        ]
       
        const data = await addLog(values, tipo)
       return res.status(200).json({data})
    }

   
}

export const ObterLogactividades = async (req, res) =>{

    const {admin} = req.params
    const {tipo} = req.params
   if(tipo == "administrador"){

       const data = await ObterLog(tipo, admin)
       res.status(200).json({ data })
   }
    if (tipo == "gestor") {

        const data = await ObterLog(tipo, admin)
        res.status(200).json({ data })
    }
    if (tipo == "usuario") {

        const data = await ObterLog(tipo, admin)
        res.status(200).json({ data })
    }
}

export const deletarId = async (req, res)=>{
    const {id} = req.params;

    const data = await Deletar(id);
    res.status(200).json({data})

}

export const  DeletarLog = async(req, res)=>{


    const {id} = req.params;

    console.log(id)
    const data = await DeletarTudo();
    res.status(200).json({data})

}