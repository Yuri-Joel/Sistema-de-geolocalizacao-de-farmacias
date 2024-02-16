import { Link } from "react-router-dom"
import { ContarUser } from "../Components/Contagem"
import { CountFarmacias } from "../Components/Contagem"
import k from '../../assets/Geo Farma/Geo Farma.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
export const Home = () => {
    return (
        <>
            <header id="heade" class="fixed-top">
                <div class="container-fluid">

                    <div class="row justify-content-center">
                        <div class="col-xl-9 d-flex align-items-center justify-content-lg-between">
                            <Link href="index.html" className="logo d-flex align-items-center">
                                <img src={k} alt="eee" />
                                <span className="d-none d-lg-block" style={{ color: 'white' }}>GeoFarma</span>
                            </Link>
                            <nav id="navbar" class="navbar order-last order-lg-0">
                                <ul>
                                    <li><Link class="nav-link scrollto active" >Inicio</Link></li>
                                    <li><Link class="nav-link scrollto" >Sobre</Link></li>
                                    <li><Link class="nav-link scrollto" >Serviçoes</Link></li>
                                    <li><Link class="nav-link scrollto" >Contactos</Link></li>
                                </ul>
                                <i class="bi bi-list mobile-nav-toggle"></i>
                            </nav>
                            <Link to={'/cadastrar'} class="btn" style={{ listStyle: 'none', backgroundColor: '#00968c', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center' }}>Cadastrar</Link>

                            <Link to={'/login'} class="btn" style={{ listStyle: 'none', backgroundColor: '#00968c', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center' }}>Login</Link>
                        </div>
                    </div>

                </div>
            </header>

            <section id="hero" className="d-flex flex-column justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <h1>GeoFarma-Encontre Facilmente uma Farmacia</h1>
                            <h2>Facilite a sua vida e poupe o seu tempo</h2>
                        </div>
                    </div>
                    <div><h1 style={{color:'white'}}><ContarUser />: Usuarios</h1></div>
            <div><h1 style={{color:'white'}}> <CountFarmacias />: Farmácias</h1></div>
                </div>
               
            <div><Link to="/map"></Link></div>
            </section>
           
        </>
    )
}