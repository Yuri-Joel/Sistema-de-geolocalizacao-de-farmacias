import axios from 'axios'

export const FavoritarFarma = (id) =>{
    axios.post("http://localhost:8800/fav/favoritos/",id)
    .then(res => {
        if(res.data.status = "Sucess"){

            return "Adicionado como favorito"
        }
}
    )
    .catch(error=> console.error( error+"erro! ao servidor"))

} 