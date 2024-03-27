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
  const id = localStorage.getItem("farma")
 
  return (
    <>
      <aside id="sidebar" className="sidebar" style={{ backgroundColor: '#00968c' }}>

        <ul className="sidebar-nav" id="sidebar-nav">
          <hr style={{ color: 'white' }} />
          <li className="nav-item">
            <Link className="nav-link " to={"#"}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <hr style={{ color: 'white' }} />
          <li className="nav-heading" style={{ color: 'white', fontSize: '1rem' }}>GERENCIAR</li>
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
                
                  <li>
                    <Link to={`/EditarFarma/${id}`} style={{ color: 'white' }}>
                      <i className="bi bi-circle" ></i><span>Editar Farmacia</span>
                    </Link>
                  </li>
                </ul>
              </li> :
              <>
              </>
          }

          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" to={"#"}>
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
          <li className="nav-heading" style={{ color: 'white', fontSize: '1rem' }}>REGISTROS</li>
          <li className='nav-item'>
         <Link className='nav-link collapsed' to={`/estatisticas`} >
              <i className="bi bi-circle"></i>
              <span>Dados Estatisticos</span>
             </Link>
           </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to={`/loggestor`}>
              <i className="bi bi-patch-exclamation"></i>
              <span>Logs de Actividades</span>
            </Link>
          </li>
         {/*  <li className="nav-item">
            <Link className="nav-link collapsed" to={`#`}>
              <i className="bi bi-graph-up"></i>
              <span>Dados Estatisticos</span>
            </Link>
          </li>  */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to={`/map`}>
              <i className="bi bi-geo-alt-fill"></i>
              <span>Map</span>
            </Link>
          </li>
         
        </ul>

      </aside>
    </>
  )
}
