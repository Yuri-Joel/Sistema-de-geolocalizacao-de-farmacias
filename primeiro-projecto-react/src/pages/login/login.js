import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


export const login = ()=>{

    const users = {
        email: email,
        senha: senha
    }
    const Navigate = useNavigate()
    const [email, setemail] = useState("")
    const [senha, setsenha] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()

        axios.post(`http://localhost:8800/l/login`, users)
        .then(res => {
            if(res.data.status == "Sucess"){
                Navigate("/Home")
            } else{
                alert("erro ao logar neste servidor")
            }

        } )
        .then(err => alert(err))
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <input  type='email'placeholder='Email*' value={email} onChange={(e)=> setemail(e.target
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
    
    )
}