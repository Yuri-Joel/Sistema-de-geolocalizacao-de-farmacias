import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'





export const CadastrarsubGestor = ()=>{
    

        const Navigate = useNavigate()
    const Idgestor = localStorage.getItem("usuario");

    const [Subgestor, setSubgestor] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        gestor: Idgestor 

    })
    const handleGestor = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8800/sub/subcges`, Subgestor)
                toast.success(res.data.data)
            Navigate("/listarsubgestor")
                

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={handleGestor}>
            <div>
                <input type="text" placeholder="nome do funcionario" onChange={(e)=> setSubgestor({...Subgestor, nome: e.target.value})} />
            </div>
            <div>
                <input type="text" placeholder="email do funcionario" onChange={(e)=> setSubgestor({...Subgestor, email: e.target.value})} />
            </div>
            <div>
                <input type="pass"placeholder="senha" onChange={(e)=> setSubgestor({...Subgestor,senha: e.target.value})} />
            </div>
            <div>
                <input type="text" placeholder="9XX XXX XXX" onChange={(e)=> setSubgestor({...Subgestor, telefone: e.target.value})} />
            </div>
            <button type="submit">Cadastrar</button>
           </form> 
        
        </>
    )
}