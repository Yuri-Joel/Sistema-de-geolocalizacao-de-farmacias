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
import FooterDashboard from '../../../components/footer/footer';
import HeaderAdmin from '../../../components/heder/admin/headerAdmin';
import AdminSide from '../../../components/aside/admin/adminSide';
import { ContarUser, CountFarmacias, CountGestores } from '../../../../pagesHome/Components/Contagem';
import { Graficos } from '../Components/Graficos/Graficos';
import {GraficosAreChart} from '../Components/Graficos/GraficosBar';
import {GraficosLinear} from '../Components/GraficosLinear/GraficosLinearCircular';
import { GraficosBarTriangle } from '../Components/Graficos/GraficosBarTriangle';
import { LogActividades } from '../../../../Log_Actividades/Log_actividades';

export default function Administrador() {


  return (
    <>
     <LogActividades />
      <HeaderAdmin />

      <AdminSide />
      {/*              main                              */}
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
          <div className="row">
            <div className="col-md-3">
              <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
              <div className="filter">
                <a className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Menu</h6>
                  </li>
                  <li><Link className="dropdown-item" to={`/adminusuario`}>Listar</Link></li>
                </ul>
              </div>
                <div className="card-body">
                  <h5 className="card-title">Usuarios</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <div className="ps-3">
                      <h6><ContarUser /></h6>
                      <h6 style={{fontSize:'1rem'}}>Cadastrados</h6>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* ................ */}

            <div className="col-md-3">
              <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
              <div className="filter">
                <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Menu</h6>
                  </li>
                  <li><Link className="dropdown-item" to={`/adminlistarGestor`}>Listar</Link></li>
                  <li><Link className="dropdown-item" to={`/adminCadastrarGestor`}>Cadastrar</Link></li>
                </ul>
              </div>
                <div className="card-body">
                  <h5 className="card-title">Gestores</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3">
                      <h6><CountGestores /></h6>
                      <h6 style={{fontSize:'1rem'}}>Cadastrados</h6>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ................ */}
            <div className="col-md-3">
              <div className="card info-card sales-card" style={{ backgroundColor: '#00968c', color: 'white' }}>
              <div className="filter">
                <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Menu</h6>
                  </li>
                  <li><Link className="dropdown-item" to={`/adminfarmacias`}>Listar</Link></li>
                  <li><Link className="dropdown-item" to={`/adminCadastrarFarmacias`}>Cadastrar</Link></li>
                </ul>
              </div>
                <div className="card-body">
                  <h5 className="card-title">Farmácias</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-geo"></i>
                    </div>
                    <div className="ps-3">
                      <h6><CountFarmacias /></h6>
                      <h6 style={{fontSize:'1rem'}}>Cadastradas</h6>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/*      */}
          </div>
          

         <div className='container'>
           <div className="row">      
            <div className="col-9">
            <div className="card">

              <div className="filter">
                <Link className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li><Link className="dropdown-item" >Today</Link></li>
                  <li><Link className="dropdown-item" >This Month</Link></li>
                  <li><Link className="dropdown-item" >This Year</Link></li>
                </ul>
              </div>

              

              
              <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Reports <span>/Today</span></h5>
                  <div id="reportsChart">
                  <Graficos /> 
                  </div>
      
                </div>
                </div>
                </div>

                <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Reports <span>/Today</span></h5>
                  <div id="reportsChart">
                  <GraficosLinear />
                  </div>
      
                </div>
                </div>
                </div>
                <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Reports <span>/Today</span></h5>
                  <div id="reportsChart">
                  <GraficosAreChart />
                  </div>
      
                </div>
                </div>
                </div>
                <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Reports <span>/Today</span></h5>
                  <div id="reportsChart">
                  <GraficosBarTriangle />
                  </div>
      
                </div>
                </div>
                </div>
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