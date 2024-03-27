import { useEffect, useState } from "react"
import { ContarSubgestor } from "./components/ContarSubgestor"
import { ContarMedi } from "./components/ContarMedicamentos"
import { ContarfavMedi } from "./components/ContarMedFavoritos"
import FooterDashboard from "../Dashboard/components/footer/footer"
import { HeaderGestor } from "../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../Dashboard/components/aside/gestor/gestorSide"
import { GraficomedFarma } from "./DadosGraficosGestor/GraficofavMedFarma"
import { Link } from "react-router-dom"
import { LogActividades } from "../Log_Actividades/Log_actividades"
import {toast} from 'react-toastify'
import { api } from "../api"



export const Gestor = () => {

    const [NomeFarma, setNomeFarma] = useState("")
    const [value, setvalue]= useState(null)
    const [load, setload] = useState(false)
    const id = localStorage.getItem('usuario')
    const farma = localStorage.getItem("farma")
    const [horaOpen, sethoraOpen] = useState("")
    const [horaClose, sethoraClose] = useState("")

    const NomeId = async () => {
        try {
            const res = await api.get(`/ges/nome/${id}`)
            setNomeFarma(res.data.data[0].nome)
            setload(true)


        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        NomeId();
        Openfarmacia();
    }, [])

    
    const Openfarmacia = async()=> {
        try {
            
            const res = await api.get(`/f/obterfarma/${farma}`)
            setvalue(res.data.data[0].aberto)
            console.log(value)
        } catch (error) {
            throw new Error (error)
        }
    }


    const Horario = async(e)=>{
        e.preventDefault();

        if(horaClose && horaClose){
            console.log(horaClose , horaOpen)
        try {
            const res = await api.put(`/f/horario/${farma}`, {horaOpen, horaClose}) 
            console.log(res.data.data)
            sethoraClose(" ")
            sethoraOpen(" ")
            toast.success("Novo horario Adicionado")
             Openfarmacia();
        } catch (error) {
            console.log(error)
        } } else{
            toast.error("ERRO! na digitação da hora")
        }
    }

    return (
        <>
        <LogActividades tipo={"gestor"} />
            <HeaderGestor />  
            <GestorSide />
            <main id="main" className="main">
                
                <div className="pagetitle" style={{display:'flex',flexDirection:'column',gap:'1.7rem'}}>
                    <div>
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/gestor'}>Home</Link></li>
                            <li className="breadcrumb-item active"> Dashboard / {(load && <>{NomeFarma}</>)} </li>
                            <li className="breadcrumb-item">
                            </li>
                        </ol>
                    </nav>
                    </div>
                    <div>
                   {/*  <button className="btn btn-primary"> Farmacia {value ? "ABERTA": "FECHADA"}</button>  */}
                               <div>
                                    <span>De momento sua farmacia encontra-se {value ? "ABERTA" : "FECHADA"} </span>

                               </div>
                               <div>
                               <form onSubmit={Horario}>
                                <div>
                                    <input   type="time"  value={horaOpen} onChange={(e)=> sethoraOpen(e.target.value)} />
                                </div>
                                <div>
                                    <input  type="time"  value={horaClose} onChange={(e)=> sethoraClose(e.target.value)} />
                                </div>
                                   <div>
                                   <button type="submit">Novo Horario</button>
                                   </div>
                                </form>
                               </div>
                               </div>
                </div>
                <section className="section dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
                                <div className="filter">
                                    <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Menu</h6>
                                        </li>
                                        <li><Link className="dropdown-item" to={`/listarsubgestor`}>Listar</Link></li>
                                        <li><Link className="dropdown-item" to={`/cadastrarsub`}>Cadastrar</Link></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">SubGestores</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6><ContarSubgestor /></h6>
                                            <h6 style={{ fontSize: '1rem' }}>Cadastrados</h6>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ................ */}
                        <div className="col-md-3">
                            <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
                                <div className="filter">
                                    <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Menu</h6>
                                        </li>
                                        <li><Link className="dropdown-item" to={`/listarprodutos`}>Listar</Link></li>
                                        <li><Link className="dropdown-item" to={`/cadastrarprodutos`}>Cadastrar</Link></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Produtos</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-bag"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6> <ContarMedi /></h6>
                                            <h6 style={{ fontSize: '1rem' }}>Cadastrados</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
                                <div className="card-body">
                                    <h5 className="card-title">favoritados</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-bookmark-heart"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6><ContarfavMedi /></h6>
                                            <h6 style={{ fontSize: '1rem' }}>Cadastrados</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div id="reportsChart">
                                <GraficomedFarma />

                            </div>

                        </div>
                    </div>
                </div>
                </section>
            </main>

            <FooterDashboard />
        </>
    )
}