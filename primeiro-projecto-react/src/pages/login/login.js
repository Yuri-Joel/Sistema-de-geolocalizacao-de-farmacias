import axios from 'axios'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


export const Login = ()=>{

    const Navigate = useNavigate();

    const [email, setemail] = useState("")
    const [senha, setsenha] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

     
if( email || senha ){
      await  axios.post(`http://localhost:8800/l/login`, {email, senha})
        .then(res => {
            if(res.data.status === "Sucess"){
                const id = res.data.id
               if(res.data.tipo === "usuario"){
                
                localStorage.setItem("usuario", id);
              
                Navigate("/maps");
               }
               else if(res.data.tipo === "gestor"){
                localStorage.setItem("gestor", id);
               
               }
               else if(res.data.tipo === "admin"){
                localStorage.setItem("admin", id);
             
               }
              
            } else{
               toast.error(res.data.erro)
            }

        } )
        .catch(err =>toast.error(err));
    }
     else {
        toast.error("Preenche Todos os Campos")
}
  
} 

return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <input  type='email'placeholder='email*' value={email} onChange={(e)=> setemail(e.target
                    .value)}/>
            </div>
            <div>
                <input type='password'placeholder='Palavra-passe*' value={senha} onChange={(e)=> setsenha(e.target
                    .value)} />
            </div>
            <div>
                <button type='submit'>login</button>  
            </div>
        </form>
                    <div>
                        <Link to="/recuperar">Esqueceu a senha? Recupere</Link>
                    </div>
        <div>
        <Link to="/cadastro">Cadastre-se</Link>
        </div>
        </>
    )
}