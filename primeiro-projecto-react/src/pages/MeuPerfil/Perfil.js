import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";



export const Perfil = ()=>{

const Idusuario = localStorage.getItem("usuario")
    const [user, SetUser]= useState([]);
    const ObterUserId = async ()=>{
        try {
            const res = await axios.get(`http://localhost:8800/api/usuarioId/${Idusuario}`);
            SetUser(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        ObterUserId();
    },[])
    return(
    <>
    <div>
        {
            user.map((usuario)=>(
                <div key={usuario.id}>
                <p>{usuario.nome}</p>
                <p>{usuario.telefone}</p>
                <p>{usuario.email}</p>
                </div>
            ))   
        }
     <div>
       <Link to={`/editarperfil`}>Editar</Link>
      </div>
        <div>
        <Link to={`/senha`}>senha</Link>
            </div>
       
    </div>
    </>
)
}