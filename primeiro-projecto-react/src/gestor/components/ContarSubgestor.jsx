import { useState, useEffect } from "react"
import axios from "axios"



export const ContarSubgestor = ()=>{

    const [Info, setInfo] = useState(0)
    const [load, setload] = useState(false)
    const id = localStorage.getItem('usuario')

    const Contar = async()=>{

    try {  
        const res = await axios.get(`http://localhost:8800/sub/contar/${id}`)
        setInfo(res.data.total)
        setload(true)

       

    } catch (error) {
        console.log(error)
    }

}
useEffect(()=>{
    Contar()
},[])
    return(
        ( load &&
        <>{Info}</>)
    )
}