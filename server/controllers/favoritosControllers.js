import { AddFavoritosMed, favoritosMedId, favoritosFarmaid, VerificarFavoritos, AddFavoritosFarma, DeleteFavoritosMed, DeleteFavoritosFarma} from "../Models/favoritosModels.js";


export const CriarFavMed = async (req,res)=> {
   
    const {med} = req.body;
    const {farma} = req.body;
    const {usuario} = req.body;
    const VerificarFav = await VerificarFavoritos("favoritos_medicamentos","medicamento_id",med,usuario);
       
    let a =( VerificarFav  != false)
    console.log(a)
    if(a != true){
        const values =[
            usuario,
            med,
            farma 
        ];
    
        const data = await AddFavoritosMed(values)
        console.log(data)
        res.status(200).json({status: data})

    } else{
        
        const deletar = await DeleteFavoritosMed(usuario, med)
        res.status(200).json({status: deletar})
    }
   
}
export const CriarFavFarma = async(req, res)=>{
    const {usuario} = req.body;
    const {farma} = req.body;
    const VerificarFav = await VerificarFavoritos("favoritos_farmacia","farmacia_id",farma,usuario);
    let a =( VerificarFav  != false)
    if(a != true){
        const values = [
           usuario,
            farma 
        ];
    
        const data = await AddFavoritosFarma(values)
        res.status(200).json({status: data})

    } else{
        return res.status(200).json({status: "Favorito já Cadastrado"})
    }
}

export const DeletaFav = async (req,res)=> {
    const {id} = req.params
    const {tabela} =  req.params;
    
    const data  =  await DeleteFavoritosFarma(tabela,id)

    res.status(200).json({data})
}
///// aqui as funcoes buscam os medicamentos e as farmacias favoritas

export const favoritosMed = async(req,res)=>{
    const {id} = req.params
    const data = await favoritosMedId(id)
   
    res.status(200).json({data})
}

export const favoritosFarma = async(req,res)=>{
    const {id} = req.params
    const data = await favoritosFarmaid(id)
   
    res.status(200).json({data})
}