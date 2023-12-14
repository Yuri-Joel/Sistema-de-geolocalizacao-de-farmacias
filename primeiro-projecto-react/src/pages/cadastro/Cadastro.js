import { useState } from "react";
import axios from "axios";




export const Cadastro =()=>{
   
    const [Cadastro, setCadastro]= useState({
        nome: '',
        email:'',
        senha:''
    })
    const [confirmSenha , setsenha] = useState('')

    axios.defaults.withCredentials = true;
   const handleSubmit = (e)=>{
        e.preventDefault()

        if( confirmSenha  ===  Cadastro.senha){
        axios.post(`http://localhost:8800:/api/cadastro`, Cadastro)
        .then(res => {
            if(res.data.status == "Sucess"){
                Navigate("/Home")
            } else{
                alert("erro ao logar neste servidor")
            }

        } )
        .then(err => alert(err))
    } else{
        alert("DIgite as mesmas passowords")
    }

        
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <input placeholder="Nome"  onChange={e => setCadastro({...Cadastro, nome: e.target.value})} />
        </div>
        <div>
            <input placeholder="Nome"  onChange={e => setCadastro({...Cadastro, email: e.target.value})} />
        </div>
        <div>
            <input placeholder="Nome"  onChange={e => setCadastro({...Cadastro, senha: e.target.value})} />
        </div>
        <div>
            <input placeholder="Nome" value={confirmSenha} onChange={e => setsenha(e.target.value)} />
        </div>
        <div>
           <button type="submit">Cadastrar</button>
        </div>

        </form>
       
        </>
    )
}