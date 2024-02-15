import { useState,useEffect } from "react";
import axios from 'axios'


export const Nome = ()=>{
    const Idusuario =  localStorage.getItem('usuario');
const [user, SetUser]= useState([]);
  const [dataload, setload] = useState(false)
    
const ObterUserId = async ()=>{
    try {
        const res = await axios.get(`http://localhost:8800/api/usuarioId/${Idusuario}`);
        SetUser(res.data.data[0].nome)
        setload(true)
    } catch (error) {
        console.error(error)
    }
  }
  useEffect(()=>{
  ObterUserId();
  },[])

  const nome = user;
   
  return(
    <>
      { (dataload &&
      <>{nome}</>
      ) 
      }
    </>
  )
}