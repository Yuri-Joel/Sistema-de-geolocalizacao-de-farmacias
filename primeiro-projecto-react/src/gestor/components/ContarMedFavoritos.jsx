import { useState, useEffect } from "react"
import axios from "axios"



export const ContarfavMedi = ()=>{

    const [Info, setInfo] = useState(0)
    const id = localStorage.getItem('usuario')
    const [load, setload] = useState(false)

    const Contar = async()=>{

    try {   
        const res = await axios.get(`http://localhost:8800/m/totalfav/${id}`)
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