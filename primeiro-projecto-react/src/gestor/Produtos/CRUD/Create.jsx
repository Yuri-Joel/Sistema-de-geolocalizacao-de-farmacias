import axios from "axios"
import { useState } from "react"
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


export const  CreateProduto = ()=>{

    const Navi = useNavigate()
    const farma = localStorage.getItem(`farma`)
    const [Products, setProducts] = useState({
        farma: farma,
        nome:"",
        preco:0,
        data_validade: "",
        informacoes: "",
        tipo: "",
        imagem: null,
        disponibilidade: ""
       
    })


    const handleCriarProducts = async(e)=>{

        e.preventDefault();
        if (!Products.imagem) {
            console.log('Nenhuma imagem selecionada.');
            return;
        }
            const formdata = new FormData();
        formdata.append("farma", Products.farma)
        formdata.append("nome", Products.nome)
        formdata.append("preco", Products.preco)
        formdata.append("tipo", Products.tipo)
        formdata.append("data_validade", Products.data_validade)
        formdata.append("informacoes", Products.informacoes)
        formdata.append("image", Products.imagem)
        formdata.append("disponibilidade", Products.disponibilidade)      

        try {
            const res = await axios.post(`http://localhost:8800/m/addmed`, formdata)   
            
            toast.success(res.data.data)
            Navi("/listarprodutos")
        } catch (error) {
            console.log(error)
    }
}

    return (
        <>
            <form onSubmit={handleCriarProducts}>
                <div>
                    <input type="text" placeholder="nome do medicamento" onChange={(e) => setProducts({ ...Products, nome: e.target.value })} />
                </div>
                <div>
                    <input type="text" placeholder="preco" onChange={(e) => setProducts({ ...Products, preco: e.target.value })} />
                </div>
                <div>
                    <input type="text" placeholder="data de validade" onChange={(e) => setProducts({ ...Products, data_validade: e.target.value })} />
                </div>
                <div>
                    <input type="text" placeholder="tipo ex: analgesico" onChange={(e) => setProducts({ ...Products, tipo: e.target.value })} />
                </div>
                <div>
                    <textarea placeholder="informações" onChange={(e) => setProducts({ ...Products, informacoes: e.target.value })} ></textarea> 
                </div>
                <div>
                    <input type="file" onChange={(e) => setProducts({...Products,imagem:e.target.files[0]})} />
                </div>
                <select className='select-group select-group-left form-control"' value={Products.disponibilidade} onChange={(e) => setProducts({...Products, disponibilidade: e.target.value })} > 
                            <option  value="disponivel" selected>Disponivel</option>
                           <option value="indisponivel">indisponivel</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>

        </>
    )
}
