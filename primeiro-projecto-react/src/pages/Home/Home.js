import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {toast} from 'react-toastify'
 


export const Home = ()=>{

 const [users, setusers] = useState(0)
 const [Farmacias, setFarmacias] = useState(0)

 
 const CountUsers = async()=>{
   await  axios.get("http://localhost:8800/api/oneuser")
     .then(res => { 
      // console.log(res.data.total)
        setusers(res.data.total); 
     })
     .catch(err => toast.error("erro"+err))
 }
 
 const CountFarmacias =async()=>{
   await  axios.get("http://localhost:8800/f/cfarma")
     .then(res => {
      // console.log(res.data)
         if(res.data){
           setFarmacias(res.data.total) 
         }
     })
     .catch(erro => toast.error(erro))
 }


 useEffect(()=>{
   CountUsers();
   CountFarmacias()
 },[])

 
    return(
        <>
         <Link to="/login">iniciar Sessao</Link>
         <div>{users} : Usuarios</div>
        <div>{Farmacias}: Farmacias</div>
        </>  
    )
}