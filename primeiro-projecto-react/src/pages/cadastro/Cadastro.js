import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";





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

        if( confirmSenha  ===  Cadastro.senha){
     await  axios.post(`http://localhost:8800:/api/cadastro`, Cadastro)
        .then(res => {
            console.log(res.data);
            if(res.data.status === "Sucess"){
                Navigate("/login")
            } else{
                alert("erro ao logar neste servidor");
            }
        } )
        .then(err => alert(err))
    } else{
        alert("Digite as mesmas passowords")
    }
    
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <input placeholder="Nome"  onChange={e => setCadastro({...Cadastro, nome: e.target.value})} />
        </div>
        <div>
            <input placeholder="Email"  onChange={e => setCadastro({...Cadastro, email: e.target.value})} />
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

        </form>
       
        </>
    )
}