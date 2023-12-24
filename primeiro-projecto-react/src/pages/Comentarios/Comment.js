import React,{ useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Comentarios = ()=>{
const {usuario} = useParams()
const [texto, setTexto] = useState('');


const HandleSubmit = async(e)=>{
    e.preventDefault()
    try {
        const res = await axios.post("http://localhost:8800/sms/novasms", {usuario, texto})
            if(res.data.data === "Sucess"){
                toast.success("Enviada com Sucesso");
            } else{
                toast.error("ERRO!")
            }

    } catch (error) {
        console.log(error)
    }
 

}
    return(
        <>
        <div>
            <form onSubmit={HandleSubmit}>
                <div>
                    <textarea  value={texto} onChange={(e)=> setTexto(e.target.value)} placeholder="Digite a sua questão, reclamação, inovações"></textarea>  
                </div>
                <div>
                    <button type="submit">Comentar</button>
                </div>
            </form>
        </div>
        </>
    )
}