import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import { toast } from 'react-toastify';
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades';
import AdminSide from '../../../../components/aside/admin/adminSide';
import { api } from '../../../../../api';


export default function AdminCadastrarFarmacias() {

const IsAutenticado = !!localStorage.getItem("usuario")
const Navi = useNavigate()
  const [CadastraF, setCadastrarF] = useState({
    nome: "",
    nif: "",
    telefone: "",
    email: "",
    endereco: "",
    latitude: "",
    longitude: ""
  })
const [loading, setloading]= useState(false)
  const handleCadastrarFarma = async (e) => {
    e.preventDefault();
    setloading(true)
    if (CadastraF.nome.trim() && CadastraF.email.trim() && CadastraF.endereco.trim() && CadastraF.latitude.trim() && CadastraF.longitude.trim() && CadastraF.nif.trim() && CadastraF.telefone.trim()) {
    try {
      
      const res = await api.post(`/f/criarfarma`, CadastraF)

      if (res.data.data === "Sucess") {
        Navi("/adminfarmacias")
        toast.success("Farmacia Cadastrada")
      } else {
        toast.warn(res.data.data)
      }
    } catch (error) {
      console.log(error)
    } finally{
      setloading(false)
    }
  } else{
    toast.error("ERRO!")
  }
  }
  return (
    <>
    { IsAutenticado ?
    <>
     
      <HeaderAdmin />
      <AdminSide  />
       <LogActividades tipo={"administrador"} />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={'/admin'}>Home</Link></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="container">
            <div className="row">
              <div className="card">
                <span>Campos com Validações</span>
                <span>Todos os campos devem ser devidamento preenchidos</span>
                <hr />
                <span>Informções de identificação</span>
                <div className=" d-flex" style={{ gap: '5rem' }} >
                  <div className="d-flex" style={{ flexDirection: "column", gap: '1rem', width: '27.5rem' }}>
                    <input className='form-control' type="text" required  placeholder='Nome' onChange={(e) => setCadastrarF({ ...CadastraF, nome: e.target.value })} />
                        <input className='form-control' type="text" required  placeholder='NIF' onChange={(e) => setCadastrarF({ ...CadastraF, nif: e.target.value })} />
                  </div>

                  <div style={{ width: '27.5rem' }}>
                        <input className='form-control' type="text" required  placeholder='Endereço da Farmacia* EX:Kinaxixi rua 18' onChange={(e) => setCadastrarF({ ...CadastraF, endereco: e.target.value })} />
                  </div>
                </div>
                <hr />
                <span>Contacto</span>

                <div className="contacto d-flex" style={{ gap: '5rem' }}>
                      <input className='form-control' type="text" required  placeholder='Numero de telefone*' onChange={(e) => setCadastrarF({ ...CadastraF, telefone: e.target.value })} />
                      <input className='form-control' type="email" required  placeholder='Email*' onChange={(e) => setCadastrarF({ ...CadastraF, email: e.target.value })} />
                </div>
                <hr />
                <span>Localização</span>
                <div className="d-flex senha" style={{ gap: '5rem' }}>
                  <div className='row'>
                    <span>Latitude</span>
                        <input className='form-control' type="text" required  placeholder='Ex-34-3459354943*' style={{ width: '27.5rem' }} onChange={(e) => setCadastrarF({ ...CadastraF, latitude: e.target.value })} />
                    <span>Longitude</span>
                        <input className='form-control' type="text" required  placeholder='Ex-21-34-59-35**' style={{ width: '27.5rem' }} onChange={(e) => setCadastrarF({ ...CadastraF, longitude: e.target.value })} />
                  </div>
                 
                </div>
                <hr />

                    <Link to={`https://www.google.com/maps/@-8.8735744,13.254656,12z?hl=es&entry=ttu`}>
                  <button className='btn btn-success' style={{ marginTop: '3rem', backgroundColor: '#00968c' }}>Ir ao mapa</button></Link>
                < button onClick={handleCadastrarFarma} className='btn btn-success' style={{ marginTop: '3rem', backgroundColor: '#00968c' }}>Cadastrar</button>

              </div>
                  {(loading &&
                    <div className="loading" id="loading">
                      <div className="spinner"></div>
                    </div>
                  )}
            </div>
          </div>
        </section>
      </main>
      <FooterDashboard />
    </>
    :
    <div>
      Você não está Autenticado, faça Login
    </div>
}
    </>
  )
}
