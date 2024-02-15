import axios from "axios"
import { useState } from "react"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderGestor } from "../../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../../Dashboard/components/footer/footer"
import { Card } from "react-bootstrap"
import { LogActividades } from "../../../Log_Actividades/Log_actividades"


export const CreateProduto = () => {

    const Navi = useNavigate()
    const farma = localStorage.getItem(`farma`)
    const [Products, setProducts] = useState({
        farma: farma,
        nome: "",
        preco: 0,
        data_validade: "",
        informacoes: "",
        tipo: "",
        imagem: null,
        disponibilidade: "disponivel"

    })
    const DataVerificacao =async (value)=>{
        console.log(value)
const result = value.split("/")

if(result[0] > 0 && result[0] < 32 && result[1] > 0 && result[1] < 13 && result[2] > 2024){
    return value;

} else{
    return false
}
    }

    const handleCriarProducts = async (e) => {

        e.preventDefault();
        if (!Products.imagem) {
            console.log('Nenhuma imagem selecionada.');
            return;
        };
        if(Products.data_validade){
            const result = Products.data_validade.split("/")

            if (result[0] > "0" && result[0] < "32" && result[1] > 0 && result[1] < "13" && result[2] >= "2024") {
                
            } else {
                console.log("nada")
                console.log(result)
                toast.error("ERRO! data ex: 12/12/2024")
                return;
            }
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

            if (res.data.data === "medicamento adicionado"){ 
                toast.success(res.data.data)
               Navi("/listarprodutos")
            } else{
                toast.error(res.data.data)
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <LogActividades tipo={"gestor"} />
            <HeaderGestor />
            <GestorSide />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/gestor'}>Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard/</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                    <div className="row">
                        <Card  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <form onSubmit={handleCriarProducts} style={{display:'flex',gap:'1rem',flexDirection:'column'}}>
                            <div>
                                <input className="form-control" type="text" required placeholder="nome do medicamento" onChange={(e) => setProducts({ ...Products, nome: e.target.value })} />
                            </div>
                            <div>
                                    <input className="form-control" type="text" required placeholder="preco" onChange={(e) => setProducts({ ...Products, preco: e.target.value })} />
                            </div>
                            <div>
                                    <input className="form-control" type="text" required placeholder="data de validade" onChange={(e) => setProducts({ ...Products, data_validade: e.target.value })} />
                            </div>
                            <div>
                                    <input className="form-control" type="text" required placeholder="tipo ex: analgesico" onChange={(e) => setProducts({ ...Products, tipo: e.target.value })} />
                            </div>
                            <div>
                                    <textarea className="form-control" required placeholder="informações" onChange={(e) => setProducts({ ...Products, informacoes: e.target.value })} ></textarea>
                            </div>
                            <div>
                                    <input className="form-control" type="file" required onChange={(e) => setProducts({ ...Products, imagem: e.target.files[0] })} />
                            </div>
                            <select className='select-group select-group-left form-control"' value={Products.disponibilidade} onChange={(e) => setProducts({ ...Products, disponibilidade: e.target.value })} >
                                <option value="disponivel" selected>Disponivel</option>
                                <option value="indisponivel">indisponivel</option>
                            </select>
                            <button className="btn btn-sucess" style={{backgroundColor:'#00968c',color:'white'}} type="submit">Cadastrar</button>
                        </form>

                        </Card> 
                    </div>
                </div>
              
            </main>
            <FooterDashboard />

        </>
    )
}
