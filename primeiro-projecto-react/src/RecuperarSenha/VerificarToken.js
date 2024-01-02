import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export const RedefenirSenha = ()=>{

    const Navigate = useNavigate()
    const [token, setToken]= useState('')

    const handleSubmit =async(e)=>{
        e.preventDefault();

        try {
            const res =  await  axios.post(`http://localhost:8800/rede/redefinir-senha`, {token})
      
            if(res.data.id){
                const id = res.data.id;
                Navigate(`/addnovasenha/${id}`)
            }
            
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
   

        
    }
    
    return(
        <>
          <form onSubmit={handleSubmit}>
            <div>
                <label>Digite o texto que o enviamos:</label>
                <input value={token} onChange={(e)=> setToken(e.target.value)} placeholder="Digite sua nova senha" />
            </div>
            <div>
                <button type="submit">verificar</button>
            </div>
            </form>  
        </>
    )
}