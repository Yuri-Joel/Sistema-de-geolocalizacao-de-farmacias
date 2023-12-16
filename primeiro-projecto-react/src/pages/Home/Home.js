import { useEffect, useState } from "react"
import { CountUsers } from "../../services/Users"
import { CountFarmacias } from "../../services/FarmaciaDetals"
import { Link } from "react-router-dom"

 


export const Home = ()=>{

 const [users, setusers] = useState(0)
 const [Farmacias, setFarmacias] = useState(0)

 const Request = async()=>{
  const res = await CountUsers()
  const valor = await CountFarmacias()
    setusers(res)
    setFarmacias(valor)
 }
 
 useEffect(()=>{
    Request()
 },[])

    return(
        <>
         <div>Yuri</div>
         <Link to="/login">iniciar Sessao</Link>
         <div>{users}</div>
        <div>{Farmacias}</div>
        </>  
    )
}