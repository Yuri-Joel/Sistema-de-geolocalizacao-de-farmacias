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



export default function AdminCadastrarFarmacias() {



  const [CadastraF, setCadastrarF] = useState({
    nome: "",
    nif: "",
    telefone: "",
    email: "",
   endereco: "",
    latitude: "",
    longitude: ""
  })

  const handleCadastrarFarma = async(e)=>{
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8800/f/criarfarma`, CadastraF)

      if(res.data.data === "Sucess"){
        toast.success("Farmacia Cadastrada")
      }else{
        toast.warn("erro no servidor")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
       <>
 <HeaderAdmin  />
        
        <aside id="sidebar" className="sidebar" style={{backgroundColor:'#00968c'}}>

<ul className="sidebar-nav" id="sidebar-nav">
<hr  style={{color:'white'}}/>
  <li className="nav-item">
    <a className="nav-link " href="index.html">
      <i className="bi bi-grid"></i>
      <span>Dashboard</span>
    </a>
  </li>
  <hr  style={{color:'white'}}/>
  <li className="nav-heading" style={{color:'white',fontSize:'1rem'}}>GERENCIAR</li>
  <li className="nav-item">
    <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
      <i className="bi bi-people-fill"></i><span>Usuarios</span><i className="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <a href="components-alerts.html" style={{color:'white'}}>
          <i className="bi bi-clipboard-data"></i><span>Listar</span>
        </a>
      </li>
      <li>
        <a href="components-accordion.html"style={{color:'white'}}>
          <i className="bi bi-clipboard-plus"></i><span>Cadastrar</span>
        </a>
      </li>
    </ul>
  </li>
  <li className="nav-item">
    <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
      <i className="bi bi-people"></i><span>Gestores</span><i className="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <a href="forms-elements.html"style={{color:'white'}}>
          <i className="bi bi-circle" ></i><span>Listar</span>
        </a>
      </li>
      <li>
      <Link to={'/adminCadastrarGestor'} style={{color:'white'}}>
          <i className="btn-register"></i><span>Cadastrar</span>
        </Link>
      </li>
    </ul>
  </li>

  <li className="nav-item">
    <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
      <i className="bi bi-geo"></i><span>Farmacias</span><i className="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
      <li>
        <a href="tables-general.html" style={{color:'white'}}>
          <i className="bi bi-circle"></i><span>Listar</span>
        </a>
      </li>
      <li>
        <Link to={'/adminCadastrarGestor'} style={{color:'white'}}>
          <i className="btn-register"></i><span>Cadastrar</span>
        </Link>
      </li>
    </ul>
  </li>
  <li className="nav-heading" style={{color:'white',fontSize:'1rem'}}>REGISTROS</li>

  
  <li class="nav-item">
    <a class="nav-link collapsed" href="users-profile.html">
      <i class="bi bi-chat-left-text"></i>
      <span>Mensagens</span>
    </a>
  </li>

  <li class="nav-item">
    <a class="nav-link collapsed" href="users-profile.html">
      <i class="bi bi-patch-exclamation"></i>
      <span>Logs de Actividades</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link collapsed" href="users-profile.html">
      <i class="bi bi-graph-up"></i>
      <span>Dados Estatisticos</span>
    </a>
  </li>
</ul>

        </aside>
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

<section className="section dashboard">
        <div className="container">
             <div className="row">
                <div className="card">
                  <span>Campos com Validações</span>
                  <span>Todos os campos devem ser devidamento preenchidos</span>
                  <hr />
                   <span>Informções de identificação</span>
                   <div className=" d-flex" style={{gap:'5rem'}} >
                    <div className="d-flex" style={{flexDirection:"column",gap:'1rem', width:'27.5rem'}}>
                    <input className='form-control' type="text" name="" id=""placeholder='Nome' onChange={(e)=> setCadastrarF({...CadastraF, nome: e.target.value})} />
                    <input className='form-control' type="text" name="" id=""placeholder='NIF'onChange={(e)=> setCadastrarF({...CadastraF, nif: e.target.value})} />
                    </div>
                    
                    <div style={{width:'27.5rem'}}>
                        <input  className='form-control' type="text" name="" id=""placeholder='Endereço da Farmacia* EX:Kinaxixi rua 18'onChange={(e)=> setCadastrarF({...CadastraF, endereco: e.target.value})} />
                    </div>
                  </div>
                  <hr />
                 <span>Contacto</span>
              
                  <div className="contacto d-flex" style={{gap:'5rem'}}>
                  <input className='form-control' type="text" name="" id=""  placeholder='Numero de telefone*' onChange={(e)=> setCadastrarF({...CadastraF, telefone: e.target.value})}/>
                    <input className='form-control' type="text" name="" id="" placeholder='Email*' onChange={(e)=> setCadastrarF({...CadastraF, email: e.target.value})}/>
                  </div>
                  <hr />
                  <span>Localização</span>
                 <div className="d-flex senha"style={{gap:'5rem'}}>
              <div >
             <span>Latitude</span>
             <input className='form-control' type="text" name="" id="" placeholder='Ex-34-3459354943*' style={{width:'27.5rem'}} onChange={(e)=> setCadastrarF({...CadastraF, latitude: e.target.value})}/>
              </div>
              <div><span>Longitude</span>
                    <input className='form-control' type="text" name="" id="" placeholder='Ex-21-34-59-35**' style={{width:'27.5rem'}} onChange={(e)=> setCadastrarF({...CadastraF, longitude: e.target.value})}/>
                    </div>
                 </div>
                 <hr />
                    
                  <Link to={`/map`}>
                  <button className='btn btn-success'style={{marginTop:'3rem',backgroundColor:'#00968c'}}>Ir ao mapa</button></Link> 
              < button onClick={handleCadastrarFarma} className='btn btn-success'style={{marginTop:'3rem',backgroundColor:'#00968c'}}>Cadastrar</button>

                </div>
            </div>    
        </div>      
</section>
</main>
 <FooterDashboard />
       </>
  )
}
