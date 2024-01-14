import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import {Link}from 'react-router-dom'

export default function AdminSide({rotacadasGestor,rotacadasFarmacia}) {
  return (
    <>
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
        <Link to={rotacadasGestor} style={{color:'white'}}>
          <i className="bi bi-circle"></i><span>Cadastrar</span>
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
      <Link to={rotacadasFarmacia} style={{color:'white'}}>
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
    </>
  )
}
