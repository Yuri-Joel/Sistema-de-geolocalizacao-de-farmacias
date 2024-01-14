import axios from "axios"
import { useEffect, useState } from "react"



export const AdminMensagens = ()=>{

const [sms, Setsms] = useState([])

    const Showsms = async()=>{
        try {
             const res = await axios.get(`http://localhost:8800/`)
             Setsms(res.data.data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(()=>{
        Showsms();
    },[])
    return(
        <>
            <div>
                {
                    sms.map((mensage)=>(
                        <div>
                            <h6>{mensage.nome}</h6>
                            <p>{mensage.texto}</p>
                            <p>{mensage.data_envio}</p>
                         </div>   
                    )
                )
                }
            </div>
        </>
    )
}