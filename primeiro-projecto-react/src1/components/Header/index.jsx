import React from 'react'
import { Link } from 'react-router-dom'
import Logo from'../../assets/Geo Farma/Geo Farma wwww.png'

function Header() {
  return (
    <>
        <header>
             <div>
                <div className="logo">
                <Link>
                 <img src={Logo} alt="Logo" />
                 <span>GeoFarma</span>
                </Link>
                </div>
                <div className="lista">
                      <Link>Inicio</Link>
                      <Link>Sobre</Link>
                      <Link>Servicos</Link>
                      <Link>Login</Link>
                </div>
                  
            </div>    
            
        </header>
        </>
  )
}

export default Header;
