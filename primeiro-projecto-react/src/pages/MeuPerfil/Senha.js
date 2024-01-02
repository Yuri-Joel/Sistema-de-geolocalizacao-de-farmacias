import { useState } from "react"
import axios from "axios"
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";

export const Senha = ()=>{
    const Idusuario = localStorage.getItem('usuario');
    
    const [Alterar, setsenha] = useState({
        senhaActual: '',
        novaSenha: ''
    })
    const [ConfimarSenha , setConfirmar]= useState('')

    const HandleSubmit = async(e)=>{
        e.preventDefault();

        if(( Alterar.novaSenha  ===  ConfimarSenha) && Alterar.senhaActual && ConfimarSenha && Alterar.novaSenha){
            await  axios.put(`http://localhost:8800/api/actualizarsenha/${Idusuario}`, Alterar)
               .then(res => {
                   console.log(res.data);
                   if(res.data.data === "Actualizada"){
                      
                           toast.success("Actualização com Sucesso")
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
        <form onSubmit={HandleSubmit}>
            <div>
                <label>senha Actual</label>
            <input onChange={(e)=> setsenha({...Alterar, senhaActual: e.target.value})}/>
            </div>
            <div>
            <label>senha Nova</label>
            <input onChange={(e)=> setsenha({...Alterar, novaSenha: e.target.value})}/>
            </div>
            <div>
            <label>Confirmar senha</label>
            <input value={ConfimarSenha} onChange={(e)=> setConfirmar(e.target.value)}/>
            </div>
            <button type="submit">Salvar</button>
            <Link to={`/perfil`} />
            <Link to={`/editarperfil`} />
            
        </form>

    )
}