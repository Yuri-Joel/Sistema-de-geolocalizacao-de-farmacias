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
import FooterDashboard from '../../../components/footer/footer';
import HeaderAdmin from '../../../components/heder/admin/headerAdmin';
import AdminSide from '../../../components/aside/admin/adminSide';
import { ContarUser, CountFarmacias, CountGestores } from '../../../../pagesHome/Components/Contagem';
import { Grafico } from '../Components/Graficos/Graficos';

export default function Administrador() {
    const [toggle,settoggle]=useState(true)
/*
const Toggle= ()=>{
 settoggle(!toggle)

}

  console.log(Toggle())
*/
 const data = [{
  nome: "yuri",
  id: 12,
 }, {
  nome:"carlos",
  id: 14,
 },
{
  nome: "liliana",
  id: 16,
}]
  return (
   <>
     <HeaderAdmin />

    <AdminSide rotacadasFarmacia={'/adminCadastrarFarmacias '} rotacadasGestor={'/adminCadastrarGestor'} />
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
                      <div className="card info-card sales-card" style={{backgroundColor:'#00968c',color:'white'}}>
                     <div className="card-body">
                         <h5 className="card-title">Usuarios</h5>
                          <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-people-fill"></i>
                              </div>
                            <div className="ps-3">
                                <h6><ContarUser /></h6>
                        <h7>Cadastrados</h7>
                       </div>

      </div>
      </div>
      </div>
      </div>
      {/* ................ */}

      <div className="col-md-3">
                      <div className="card info-card sales-card" style={{backgroundColor:'#00968c',color:'white'}}>
                     <div className="card-body">
                         <h5 className="card-title">Gestores</h5>
                          <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-people"></i>
                              </div>
                            <div className="ps-3">
                                <h6><CountGestores /></h6>
                        <h7>Cadastrados</h7> 
                              </div>

      </div>
      </div>
      </div>
      </div>

      {/* ................ */}
      <div className="col-md-3">
                      <div className="card info-card sales-card" style={{backgroundColor:'#00968c',color:'white'}}>
                     <div className="card-body">
                         <h5 className="card-title">Farmácias</h5>
                          <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-geo"></i>
                              </div>
                            <div className="ps-3">
                                <h6><CountFarmacias /></h6>
                        <h7>Cadastrados</h7>
                              </div>

      </div>
      </div>
      </div>
      </div>

      {/*      */}
   </div>


   <div className="col-9">
              <div className="card">

                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>

                <div className="card-body">
                  <h5 className="card-title">Reports <span>/Today</span></h5>
 
   <div id="reportsChart">
    <Grafico data={data} type="bar" title="Número total de Usuários" />
   </div>
      <button className='btn btn-danger'>Ola</button>

   </div>
   </div>
   </div>

   <div className="col-9">
              <div className="card">

                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>

                <div className="card-body">
                  <h5 className="card-title">Reports <span>/Today</span></h5>
 
   <div id="reportsChart"></div>
      <button className='btn btn-danger'>Ola</button>

   </div>
   </div>
   </div>
   <div className="col-9">
              <div className="card">

                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>

                <div className="card-body">
                  <h5 className="card-title">Reports <span>/Today</span></h5>
 
   <div id="reportsChart"></div>
      <button className='btn btn-danger'>Ola</button>

   </div>
   </div>
   </div>
            
</section>
</main>

        <FooterDashboard />
   </>
  )
}