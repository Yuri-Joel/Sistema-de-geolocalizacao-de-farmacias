import axios from "axios";
import { useEffect } from "react";

export const LogActividades = ({tipo})=>{

    const usuario = localStorage.getItem("usuario");
    
    

     const SalvarLogActidade = async(cam)=>{
        const caminho = `http://localhost:3000${cam}`

        try {
            const res = await axios.post(`http://localhost:8800/log/lognew`, {usuario, caminho, tipo})
                   
        } catch (error) {
            console.log(error)
        }
     }   


    useEffect(()=>{
        SalvarLogActidade(window.location.pathname)
    },[])


    return(
        <>
        </>
    )
}