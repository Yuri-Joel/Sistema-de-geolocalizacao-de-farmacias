import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'


export const EditarPerfil = ()=>{

    const Idusuario = localStorage.getItem("usuario")
    const [dataload, setload]=useState(false)
    
   const [nome, setnome] = useState('');
   const [telefone, setTelefone] = useState('')
   const [email, setemail] = useState('');
    
    const ObterUserId = async ()=>{
       
        try {
            const res = await axios.get(`http://localhost:8800/api/usuarioId/${Idusuario}`)
            
            console.log(res.data.data)
           setnome(res.data.data[0].nome);
            setTelefone(res.data.data[0].telefone);
             setemail(res.data.data[0].email);
            setload(true)
        } catch (error) {
            console.error(error)
        }
    }

   
    useEffect(()=>{
        ObterUserId();
    },[Idusuario]);

     


    const ActualizarUser = async (e)=>{
        e.preventDefault();
        const User = {
            nome: nome,
            telefone: telefone,
            email: email
        }
        try {    
            const res = await axios.put(`http://localhost:8800/api/actualizar/${Idusuario}`,User)
            console.log(res.data.data)
            toast.success("Senha Actualizada")
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {
       ( dataload &&
        <form onSubmit={ActualizarUser}>
        <div>
    
        </div>
        <input value={nome} onChange={(e)=> setnome(e.target.value)} />
        <input value={telefone} onChange={(e)=> setTelefone(e.target.value)} />
        <input value={email} onChange={(e)=> setemail(e.target.value)} />
        <button type="submit">Actualizar</button>
        </form>
        )
            } 
        <Link to={`/Senha`} />
        <Link to={`/Perfil`} />
            
        </>
    )
}