import axios from "axios"
import { useEffect, useState } from "react"
import { useParams , useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'





export const UpdateProduct = ()=>{

const {id} = useParams()
const Navigate = useNavigate()

const [nome, setnome] = useState('')
const [preco, setpreco] = useState('')
const [tipo, settipo] = useState('')
const [informacoes, setinfo] = useState('')
const [imagem_path, setimagem] = useState(null)
const [disponibilidade, setdisponibilidade] = useState('')
const [data_validade, setdata] = useState('')



const getProductId = async()=>{

    try {
        const res = await axios.get(`http://localhost:8800/m/obtermed/${id}`)

        console.log(res.data.data)
        setnome(res.data.data[0].nome)
        setpreco(res.data.data[0].preco)
        settipo(res.data.data[0].tipo)
        setinfo(res.data.data[0].informacoes)
        setdata(res.data.data[0].data_validade)
        setdisponibilidade(res.data.data[0].disponibilidade)
        setimagem(res.data.data[0].imagem_path)
    } catch (error) {
        console.error(error)
    }
}


useEffect(()=>{
    getProductId();
},[id])
    const formdata = new FormData();
    const handleditarProducts = async(e)=>{
        e.preventDefault()
       

        
        formdata.append("nome",nome)
        formdata.append("preco", preco)
        formdata.append("tipo", tipo)
        formdata.append("data_validade", data_validade)
        formdata.append("informacoes", informacoes)
        formdata.append("image", imagem_path)
        formdata.append("disponibilidade", disponibilidade)

        console.log(formdata)
        try {
            const res = await axios.put(`http://localhost:8800/m/actuamed/${id}`, formdata)

            
            toast.success(res.data.data)
            Navigate("/listarprodutos")
        } catch (error) {
            
        }
           
    }

return(
    <form onSubmit={handleditarProducts}>
        <div>
            <input type="text"  value={nome} onChange={(e) => setnome(e.target.value)} />
        </div>
        <div>
            <input type="text" value={preco} onChange={(e) => setpreco( e.target.value)} />
        </div>
        <div>
            <input type="text" value={tipo} onChange={(e) => settipo(e.target.value)} />
        </div>
        <div>
            <input value={data_validade} onChange={(e) => setdata(e.target.value)} />
        </div>
        <div>
            <textarea value={informacoes} onChange={(e) => setinfo(e.target.value)} ></textarea>
        </div>
       
        <div>
            <input type="file" onChange={(e) => setimagem( e.target.files[0])} />
        </div>
        <select  value={disponibilidade} onChange={(e) => setdisponibilidade(e.target.value )} >
            <option value="disponivel">Disponivel</option>
            <option value="indisponivel">indisponivel</option>
        </select>
        <button type="submit">Cadastrar</button>
    </form>

)
}