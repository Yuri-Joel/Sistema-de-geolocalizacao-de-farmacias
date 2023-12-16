import axios from 'axios'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


export const Login = ()=>{

    const Navigate = useNavigate();

    const [Email, setemail] = useState("")
    const [Senha, setsenha] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const users = {
            email: Email,
            senha: Senha
        }

      await  axios.post(`http://localhost:8800/l/login`, users)
        .then(res => {
            console.log(res.data)
            if(res.data.status === "Sucess"){
                Navigate("/maps")
            } else{
                alert("erro ao logar neste servidor")
            }

        } )
        .then(err => alert(err))
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <input  type='email'placeholder='Email*' value={Email} onChange={(e)=> setemail(e.target
                    .value)}/>
            </div>
            <div>
                <input type='password'placeholder='Palavra-passe*' value={Senha} onChange={(e)=> setsenha(e.target
                    .value)} />
            </div>
            <div>
                <button type='submit'>login</button>  
            </div>
        </form>
        <div>
        <Link to="/cadastro">Cadastre-se</Link>
        </div>
        </>
    )
}