import axios from 'axios'

export const FavoritarFarma = async(FarmaciaId, UsuarioId) =>{
   await axios.post("http://localhost:8800/fav/favoritos/",{UsuarioId,FarmaciaId})
    .then(res => {
        if(res.data.status = "Sucess"){

            return "Adicionado como favorito"
        }
}
    )
    .catch(error=> console.error( error+"erro! ao servidor"))

} 

export const favoritarM =async(id)=>{

    await axios.post("http://localhost:8800/fav/favmed/", id)
    .then(res => {
        if(res.data.status = "Sucess"){

            return "Medicamento Adicionado como favorito"
        }
    })

}