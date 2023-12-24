import React,{ useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";



export const Recuperar = ()=>{

    const [email, setInput] = useState('');
   

    const handleSubmit = async (e)=>{
        e.preventDefault()
    await  axios.post("http://localhost:8800/rede/recuperar", email)
        .then( res => {
          
            if(res.status === 200){
                toast.success("E-mail enviado com Sucesso");
            }
            if(res.status !== 200){
                toast.error("Erro no Servidor")
            }
            console.log(res.status)
        }).catch(error => console.error(error))
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