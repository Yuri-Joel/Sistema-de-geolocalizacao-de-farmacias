import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"




export const RedefenirSenha = ()=>{
    const {token} = useParams()

    const [novaSenha, setnovaSenha]= useState('')

    const handleSubmit =async(e)=>{
        e.preventDefault();

      await  axios.post(`http://localhost:8800/rede/redefinir-senha/${token}`, novaSenha)
        .then(res => {
            toast.success(res.data.message)
            console.log(res.data)

        })
    }
    
    return(
        <>
          <form onSubmit={handleSubmit}>
            <div>
                <input type="email" value={novaSenha} onChange={(e)=> setnovaSenha(e.target.value)} placeholder="Digite sua nova senha" />
            </div>
            <div>
                <button type="submit">Nova Senha</button>
            </div>
            </form>  
        </>
    )
}