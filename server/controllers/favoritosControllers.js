import { AddFavoritosMed, DeleteFavoritos, favoritosMedId, favoritosFarmaid} from "../Models/favoritosModels.js";


export const CriarFav= async (req,res)=> {
   
    const values =[
        req.body.usuario,
        req.body.med,
        req.body.farma 
    ];

    const data = await AddFavoritosMed(values)
    res.status(200).json({data})
}

export const DeletaFav = async (req,res)=> {
    const {id} = req.params
    const data  =  await DeleteFavoritos(id)

    res.status(200).json({data})
}
///// aqui as funcoes buscam os medicamentos e as farmacias favoritas

export const favouritosMed = async(req,res)=>{
    const {id} = req.params
    const data = await favoritosMedId(id)
   
    res.status(200).json({data})
}
export const favouritosFarma = async(req,res)=>{
    const {id} = req.params
    const data = await favoritosFarmaid(id)
   
    res.status(200).json({data})
}