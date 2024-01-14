import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import logo from'../../../../assets/Geo Farma/Geo Farma.png';
import 'bootstrap/js/dist/tab'
import { Link } from 'react-router-dom';
export default function HeaderGestor() {
  const [numero,SetNumero]=useState(1)
  const [side,SetSide]=useState('') 
  const body=document.body
   body.className=`${side}`
       const open=()=>{
             if(numero%2===1){
               SetSide('toggle-sidebar')
             }else{
                SetSide('')
             } 
             SetNumero(numero+1)
       }
  return (
    <>
  <header  id="header" className="header fixed-top d-flex align-items-center" >

<div className="d-flex align-items-center justify-content-between">
<a href="index.html" className="logo d-flex align-items-center">
 <img src={logo} alt="eee" />
 <span className="d-none d-lg-block"style={{color:'white'}}>GeoFarma</span>
</a>
<i className="bi bi-list toggle-sidebar-btn "style={{color:'white'}} onClick={open}></i>


</div>

<div className="search-bar">
<form className="search-form d-flex align-items-center" method="POST" action="#">
 <input type="text" name="query" placeholder="Pesquisar" title="Enter search keyword" style={{marginLeft:'3rem',width:'20rem'}}/>
 <button type="submit" title="Search"><i className="bi bi-search"></i></button>
</form>
</div>

<nav className="header-nav ms-auto">
<ul className="d-flex align-items-center">

 <li className="nav-item d-block d-lg-none">
   <a className="nav-link nav-icon search-bar-toggle " href="#">
     <i className="bi bi-search"></i>
   </a>
 </li>

 <li className="nav-item dropdown">

   <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
     <i className="bi bi-bell" style={{color:'white'}}></i>
     <span className="badge bg-primary badge-number">4</span>
   </a>

   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
     <li className="dropdown-header">
       You have 4 new notifications
       <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="notification-item">
       <i className="bi bi-exclamation-circle text-warning"></i>
       <div>
         <h4>Lorem Ipsum</h4>
         <p>Quae dolorem earum veritatis oditseno</p>
         <p>30 min. ago</p>
       </div>
     </li>

     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="notification-item">
       <i className="bi bi-x-circle text-danger"></i>
       <div>
         <h4>Atque rerum nesciunt</h4>
         <p>Quae dolorem earum veritatis oditseno</p>
         <p>1 hr. ago</p>
       </div>
     </li>

     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="notification-item">
       <i className="bi bi-check-circle text-success"></i>
       <div>
         <h4>Sit rerum fuga</h4>
         <p>Quae dolorem earum veritatis oditseno</p>
         <p>2 hrs. ago</p>
       </div>
     </li>

     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="notification-item">
       <i className="bi bi-info-circle text-primary"></i>
       <div>
         <h4>Dicta reprehenderit</h4>
         <p>Quae dolorem earum veritatis oditseno</p>
         <p>4 hrs. ago</p>
       </div>
     </li>

     <li>
       <hr className="dropdown-divider" />
     </li>
     <li className="dropdown-footer">
       <a href="#">Show all notifications</a>
     </li>

   </ul>

 </li>

 <li className="nav-item dropdown">

   <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
     <i className="bi bi-chat-left-text" style={{color:'white'}}></i>
     <span className="badge bg-success badge-number">3</span>
   </a>

   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
     <li className="dropdown-header">
       You have 3 new messages
       <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="message-item">
       <a href="#">
         <img src="assets/img/messages-1.jpg" alt="ee" className="rounded-circle" />
         <div>
           <h4>Maria Hudson</h4>
           <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
           <p>4 hrs. ago</p>
         </div>
       </a>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="message-item">
       <a href="#">
         <img src="assets/img/messages-2.jpg" alt="eeeeee" className="rounded-circle" />
         <div>
           <h4>Anna Nelson</h4>
           <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
           <p>6 hrs. ago</p>
         </div>
       </a>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="message-item">
       <a href="#">
         <img src="assets/img/messages-3.jpg" alt="eee" className="rounded-circle" />
         <div>
           <h4>David Muldon</h4>
           <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
           <p>8 hrs. ago</p>
         </div>
       </a>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>

     <li className="dropdown-footer">
       <a href="#">Show all messages</a>
     </li>

   </ul>

 </li>
 <li className="nav-item dropdown pe-3">
   <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
     <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
     {/* <i className='bi bi-person-circle fs-3 '></i> */}
     <span className="d-none d-md-block dropdown-toggle ps-2">C.Morais</span>
   </a>
   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
     <li className="dropdown-header">
       <h6>Carlos Morais</h6>
       <span>Adminstrador</span>
     </li>
     <li>
       <hr className="dropdown-divider"/>
     </li>

     <li>
     <Link className="dropdown-item d-flex align-items-center" to={'/users-profile'}>
         <i className="bi bi-person"></i>
         <span>Meu Perfil</span>
       </Link>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>
       <li>
       <hr className="dropdown-divider" />
     </li>
     <li>
       <hr className="dropdown-divider"/>
     </li>

     <li>
       <Link className="dropdown-item d-flex align-items-center" to={'/'}>
         <i className="bi bi-box-arrow-right"></i>
         <span>Sair</span>
       </Link>
     </li>

   </ul>
 </li>

</ul>
</nav>

          </header> 
    </>
  )
}
