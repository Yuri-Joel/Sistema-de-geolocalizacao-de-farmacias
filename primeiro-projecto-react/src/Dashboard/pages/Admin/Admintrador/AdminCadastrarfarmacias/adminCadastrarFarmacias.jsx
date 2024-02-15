import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades';
import AdminSide from '../../../../components/aside/admin/adminSide';



export default function AdminCadastrarFarmacias() {

const IsAutenticado = !!localStorage.getItem("usuario")

  const [CadastraF, setCadastrarF] = useState({
    nome: "",
    nif: "",
    telefone: "",
    email: "",
    endereco: "",
    latitude: "",
    longitude: ""
  })

  const handleCadastrarFarma = async (e) => {
    e.preventDefault();

    if (CadastraF.nome && CadastraF.email && CadastraF.endereco && CadastraF.latitude && CadastraF.longitude && CadastraF.nif && CadastraF.telefone) {
    try {
      
      const res = await axios.post(`http://localhost:8800/f/criarfarma`, CadastraF)

      if (res.data.data === "Sucess") {
        setCadastrarF("")
        toast.success("Farmacia Cadastrada")
      } else {
        toast.warn("erro no servidor")
      }
    } catch (error) {
      console.log(error)
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

                <Link to={`/map`}>
                  <button className='btn btn-success' style={{ marginTop: '3rem', backgroundColor: '#00968c' }}>Ir ao mapa</button></Link>
                < button onClick={handleCadastrarFarma} className='btn btn-success' style={{ marginTop: '3rem', backgroundColor: '#00968c' }}>Cadastrar</button>

              </div>
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
