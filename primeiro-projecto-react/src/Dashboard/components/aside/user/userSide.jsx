import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import { Link } from 'react-router-dom'

export default function UserSide() {
  return (
    <>
      <aside id="sidebar" className="sidebar" style={{ backgroundColor: '#00968c' }} >

        <ul className="sidebar-nav" id="sidebar-nav">

          <li className="nav-item">
            <Link className="nav-link " to={`/map`}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to={"#"}>
              <i className="bi bi-bookmark-heart"></i><span>Favoritos</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="components-nav" className="nav-content collapse text-white" data-bs-parent="#sidebar-nav" >
              <li >
                <Link to={`/favfarma`}>
                  <i className="bi bi-circle" style={{ color: 'white' }} ></i><span style={{ color: 'white' }}>Farmácias</span>
                </Link>
              </li>
              <li>
                <Link to={`/favmed`}>
                  <i className="bi bi-circle" style={{ color: 'white' }} ></i><span style={{ color: 'white' }} >Medicamentos</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" to={"#"}>
              <i className="bi bi-chat-left-text"></i><span>Notificar</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to={`/comentar`}>
                  <i className="bi bi-circle" style={{ color: 'white' }}></i><span style={{ color: 'white' }}> Mensagem</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to={`/map`}>
              <i className="bi bi-geo-alt-fill"></i>
              <span>Map</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to={`/userlog`}>
              <i className="bi bi-patch-exclamation"></i>
              <span>Log Actividades</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}
