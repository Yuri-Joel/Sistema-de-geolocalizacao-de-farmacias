import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import { Link } from 'react-router-dom'

export default function GestorSide() {

  const isGestor = !!localStorage.getItem("gestor");
  console.log(isGestor)
  return (
    <>
      <aside id="sidebar" className="sidebar" style={{ backgroundColor: '#00968c' }}>

        <ul className="sidebar-nav" id="sidebar-nav">
          <hr style={{ color: 'white' }} />
          <li className="nav-item">
            <Link className="nav-link " href="index.html">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <hr style={{ color: 'white' }} />
          <li className="nav-heading" style={{ color: 'white', fontSize: '1rem' }}>GERENCIAR</li>
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-people-fill"></i><span>Usuarios</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to={`/adminusuario`} style={{ color: 'white' }}>
                  <i className="bi bi-clipboard-data"></i><span>Listar</span>
                </Link>
              </li>
             <li>
        <a href="components-accordion.html"style={{color:'white'}}>
          <i className="bi bi-clipboard-plus"></i><span>Cadastrar</span>
        </a>
      </li> 
            </ul>
          </li> */ }
          {
            isGestor ?
              <li className="nav-item">
                <Link className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                  <i className="bi bi-people"></i><span>Funcionarios</span><i className="bi bi-chevron-down ms-auto"></i>
                </Link>
                <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <Link to={`/listarsubgestor`} style={{ color: 'white' }}>
                      <i className="bi bi-circle" ></i><span>Listar</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/cadastrarsub`} style={{ color: 'white' }}>
                      <i className="bi bi-circle"></i><span>Cadastrar</span>
                    </Link>
                  </li>
                </ul>
              </li> :
              <>
              </>
          }

          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-people"></i><span>Produtos</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to={`/listarprodutos`} style={{ color: 'white' }}>
                  <i className="bi bi-circle" ></i><span>Listar</span>
                </Link>
              </li>
              <li>
                <Link to={`/cadastrarprodutos`} style={{ color: 'white' }}>
                  <i className="bi bi-circle"></i><span>Cadastrar</span>
                </Link>
              </li>
            </ul>
          </li>

        {/*   <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-geo"></i><span>Farmacias</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to={`/adminfarmacias`} style={{ color: 'white' }}>
                  <i className="bi bi-circle"></i><span>Listar</span>
                </Link>
              </li>
              <li>
                <Link to={`/adminCadastrarFarmacias`} style={{ color: 'white' }}>
                  <i className="btn-register"></i><span>Cadastrar</span>
                </Link>
              </li>
            </ul>
          </li> */}
          <li className="nav-heading" style={{ color: 'white', fontSize: '1rem' }}>REGISTROS</li>
        </ul>

      </aside>
    </>
  )
}
