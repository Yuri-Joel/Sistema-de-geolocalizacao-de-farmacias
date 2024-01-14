import axios from "axios"
import React,{ useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderUser from '../../../Dashboard/components/heder/user/headerUser'
import UserSide  from'../../../Dashboard/components/aside/user/userSide'
import { Nome } from "../../../components/NomeUser/Nome";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import FooterDashboard from "../../../Dashboard/components/footer/footer";

export const FavoritosFarmacia = ()=>{

  const {id}= useParams();
    const [Farma, setfarma] = useState([]);
    const Favfarma = async ()=>{
        try{
            const res =  await axios.get(`http://localhost:8800/fav/favoritos/${id}`)
             setfarma(res.data.data)
        }
        catch(err) {
            toast.error(err)
        };
    }

    useEffect(()=>{
        Favfarma();
    },[])


    const Delete = async(id)=>{
        console.log(id)
        const tabela = "favoritos_farmacia"
        await axios.delete(`http://localhost:8800/fav/favoritodel/${id}/${tabela}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.data){
               
                toast.success(res.data.data);
                Favfarma();
            }
            
        }).catch((err) => {
            toast.error(err)
        });
    }
    return(
        <> 
            <HeaderUser nome={<Nome />} />
            <UserSide />
            <main id="main" className="main" style={{backgroundColor:'#00968c53'}} >
            <div className="pagetitle">
      <h1 style={{color:'white'}}>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/map'}>Map</Link></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    <section className="section dashboard">
      <div className="row">       
   <div className="card info-card sales-card   min-vh-40" style={{height:'30rem'}}>
   <table className="table">
            <thead>
                    <tr>
                    <th>Nome </th>
                    <th>endereço</th>
                    <th>telefone</th>
                    <th>NIF</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
            Farma.map((farmacia)=>(
                <tr key={farmacia.ide}>
                    <td>{farmacia.nome}</td>
                    <td>{farmacia.endereco}</td>
                    <td>{farmacia.telefone}</td>
                    <td>{farmacia.nif}</td>
                    <td>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'0.4rem'}}>
                                <Link to={`/farmacia/${farmacia.id}/${id}`}>
                                 <button 
                                 className='btn btn-success'style={{backgroundColor:'#00968c'}}
                                 >
                                  Ver Farmacia
                                  </button>
                                  </Link>
                                  </div>
                    </td>
                    
                    <td>
                        <button className="btn btn-danger" onClick={()=> Delete(farmacia.ide)}>Eliminar</button>
                    </td>
                </tr>
            ))}
             </tbody>
        
        </table>
 

    </div>
    
    </div>
    
    </section>
            
            </main>
           <FooterDashboard />        
        </>

    )
}