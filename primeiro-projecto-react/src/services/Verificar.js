import axios from "axios"
import { useState } from "react"


export const Verificar = async()=>{
    
const[auth, setauth]= useState({
    auth: false,
    nome: '',
})
await axios.get("http://localhost:8800/l/verificar")
.then(res => {
    if(res.data.status === 'Sucess'){
        console.log(res.data.nome)
       setauth({...auth,nome: res.data.nome});
       setauth({...auth, auth: true});

       return { auth: auth.auth, nome: auth.nome};
    } else{
        return auth;
    }
})
.catch(err => console.error(err))
}