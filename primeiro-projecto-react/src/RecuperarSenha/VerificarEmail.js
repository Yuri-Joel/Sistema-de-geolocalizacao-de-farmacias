import React,{ useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"




export const Recuperar = ()=>{

    const Navigate = useNavigate()
    const [email, setInput] = useState('');
   

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res =  await  axios.post(`http://localhost:8800/rede/recuperar`,{email})
            if(res.status === 200){
                toast.success("E-mail enviado com Sucesso");
                Navigate(`/redefinir-senha`)
            }
            if(res.status !== 200){
                toast.error("Erro no Servidor")
            }
            console.log(res.status)
        } catch (error) {
            console.log(error)
        }
            
       
    }
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Seu E-mail:</label>
            <input placeholder="Seu email  " value={email} onChange={(e)=> setInput(e.target.value)} />
                </div>
                <div>
                    <button type="submit"> Recuperar</button>
                </div>
            </form>
        </div>
        </>
    )
}