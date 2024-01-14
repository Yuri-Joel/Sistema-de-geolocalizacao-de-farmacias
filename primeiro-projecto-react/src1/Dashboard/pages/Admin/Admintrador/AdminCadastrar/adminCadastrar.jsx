import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
// import logo from'./Geo Farma wwww.png';
import 'bootstrap/js/dist/tab'
import { Link } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function AdminCadastrar() {

  const [Gestores, setGestores] = useState({
    nome: "",
    email: "",
    nomeusuario: "",
    senha: "",
    telefone: "",
    farmacia:0,
    
  })
  const [ConfimarSenha, setConfirmar] = useState('')
  const [Farmacias, SetFarmacias] = useState([]);
  const [load, setload] = useState(false)

  const FarmaciasData = async()=>{
  
    try{
      const res = await axios.get("http://localhost:8800/f/todasfarma")
          SetFarmacias(res.data.data)
          setload(true)
          console.log(res.data.data)

      } catch(error){
      console.log(error)
      }
}
useEffect(()=>{
  FarmaciasData();
})
  const HandleGestores = async(e)=>{
    e.preventDefault()
if(ConfimarSenha === Gestores.senha){
    try {
      const res = await axios.post("http://localhost:8800/ges/cges", Gestores)

      console.log(res.data)
      if(res.data.data === "Sucess"){
      toast.success(res.data.data)
    }else{
      toast.warn("Erro no servidor")
    }
      
    } catch (error) {
      console.log(error)
      
    }
  }else{
      toast.warn("Digite a mesma Senha")
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
      <Link to={'/adminCadastrarFarmacias'} style={{color:'white'}}>
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
                <div className="card" style={{height:'32rem'}}>
                  <span>Campos com Validações</span>
                  <span>Todos os campos devem ser devidamente preenchidos</span>
                  <hr />
                   <span>Informções de identificação</span>
                   <div className="d-flex " style={{gap:'5rem'}} >
                    <input className='form-control' type="text" name="" id=""placeholder='Nome' onChange={(e)=> setGestores({...Gestores, nome: e.target.value})} />
                    <input className='form-control' type="text" name="" id=""placeholder='Nome usuario*'  onChange={(e)=> setGestores({...Gestores, nomeUsuario: e.target.value})} />
                    
                  </div>
                 <span>Conctacto</span>
                  <div className="contacto d-flex" style={{gap:'5rem'}}>
                  <input className='form-control' type="text" name="" id=""  placeholder='Numero de telefone*'  onChange={(e)=> setGestores({...Gestores, telefone: e.target.value})}/>
                    <input className='form-control' type="text" name="" id="" placeholder='Email*'  onChange={(e)=> setGestores({...Gestores, email: e.target.value})}/>
                  </div>
                  <hr />
                  <span>Credencias</span>
                 <div className="senha d-flex"style={{gap:'5rem'}}>
                 <input className='form-control' type="text" name="" id="" placeholder='Palavra passe*'  onChange={(e)=> setGestores({...Gestores, senha: e.target.value})}/>
                    <input className='form-control' type="text" name="" id="" placeholder='confirmar Palavra passe*' value={ConfimarSenha} onChange={(e)=> setConfirmar(e.target.value)}/>
                 </div>
                 <hr />
                     <div className="d-flex"style={{flexDirection:'column',gap:'0.4rem'}}>
                        <span>Gerenciar</span>

                         <select className='select-group select-group-left form-control"'>
                            <option value="">Escolher a Farmacia para Gerenciar</option>
                            { load && 
                              Farmacias.map((farma)=>(
                                <option key={farma.id} value={farma.id} onChange={(e)=> setGestores({...Gestores, farmacia: e.target.value})}>{farma.nome}</option>
                              ))
                            }
                         </select>
                     </div>
                    <button onClick={HandleGestores} className='btn btn-success'style={{marginTop:'3rem',backgroundColor:'#00968c'}}>Cadastrar</button>
                </div>
            </div>    
        </div>      
</section>
</main>
<FooterDashboard />
       </>
  )
}


