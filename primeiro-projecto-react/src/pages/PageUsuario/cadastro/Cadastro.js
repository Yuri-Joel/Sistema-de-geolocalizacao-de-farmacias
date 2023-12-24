import { useState } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import {toast} from 'react-toastify'






export const Cadastro =()=>{
    const Navigate = useNavigate()
   
    const [Cadastro, setCadastro]= useState({
        nome: '',
        email:'',
        senha:''
    })
    const [confirmSenha , setsenha] = useState('')

   
   const handleSubmit = async(e)=>{
        e.preventDefault()

        if(( confirmSenha  ===  Cadastro.senha) && Cadastro.nome && Cadastro.email){
     await  axios.post(`http://localhost:8800/api/cadastro`, Cadastro)
        .then(res => {
            console.log(res.data);
            if(res.data.status === "Sucess"){
                setTimeout(()=>{
                    toast.success("Cadastrado com Sucesso")
                },1500)
                Navigate("/login")
            } else{
                toast.warn("erro ao logar neste servidor");
            }
        } )
        .catch(err => toast.warn(err))
    } else{
       toast.error("ERRO!")
    }
    
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <input placeholder="Nome"  onChange={e => setCadastro({...Cadastro, nome: e.target.value})} />
        </div>
        <div>
            <input placeholder="Email" type="email" onChange={e => setCadastro({...Cadastro, email: e.target.value})} />
        </div>
        <div>
            <input placeholder="sua senha"  onChange={e => setCadastro({...Cadastro, senha: e.target.value})} />
        </div>
        <div>
            <input placeholder="Confirmar senha" value={confirmSenha} onChange={e => setsenha(e.target.value)} />
        </div>
        <div>
           <button type="submit">Cadastrar</button>
        </div>
        <div>
            <Link to="/login">Login</Link>
        </div>
        </form>
       
        </>
    )
}