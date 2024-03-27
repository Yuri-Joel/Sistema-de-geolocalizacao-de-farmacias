import { useEffect } from "react";
import { api } from "../api";

export const LogActividades = ({tipo})=>{

    const usuario = localStorage.getItem("usuario");
    
    

     const SalvarLogActidade = async(cam)=>{
        const caminho = `http://localhost:3000${cam}`

        try {
            await api.post(`/log/lognew`, {usuario, caminho, tipo})
                   
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