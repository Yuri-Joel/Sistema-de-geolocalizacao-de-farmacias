import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";




export const AddNovaSenha = ()=>{
        const Navigate = useNavigate()
const {id} = useParams();
    const [novaSenha, setnovaSenha]= useState('')

    const handleSubmit =async(e)=>{
        
        e.preventDefault();
try {
    const res = await  axios.post(`http://localhost:8800/rede/novasenha`,{id, novaSenha})
            
            console.log(res.data.message)
            toast.success(res.data.message) 
            if(res.data.message === "Actualizada"){
                Navigate("/login")
            }   
} catch (error) {
    console.log(error)
}
      
    }
    
    return(
        <>
          <form onSubmit={handleSubmit}>
            <div>
                <label>Digite a sua nova senha:</label>
                <input  value={novaSenha} onChange={(e)=> setnovaSenha(e.target.value)} placeholder="Digite sua nova senha" />
            </div>
            <div>
                <button type="submit">Nova Senha</button>
            </div>
            </form>  
        </>
    )
}