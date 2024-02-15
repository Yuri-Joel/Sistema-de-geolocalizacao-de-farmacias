import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
// import logo from'./Geo Farma wwww.png';
import 'bootstrap/js/dist/tab'
import {Link, useNavigate} from 'react-router-dom';
import React,{useEffect,useState } from 'react';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades';
import AdminSide from '../../../../components/aside/admin/adminSide';



export default function AdminCadastrarGestor() {

  const IsAutenticado = !!localStorage.getItem("usuario");
  const Navigate = useNavigate()
  const [Gestores, setGestores] = useState({
    nome: "",
    email: "",
    nomeusuario: "",
    senha: "",
    telefone: "",
    farmacia:0,
    
  })
  const [ConfimarSenha, setConfirmar] = useState('')
  const [Farmacias, SetFarmacias] = useState([]);
  const [load, setload] = useState(false)

  const FarmaciasData = async()=>{
  
    try{
      const res = await axios.get("http://localhost:8800/f/todasfarma")
          SetFarmacias(res.data.data)
          setload(true)
          console.log(res.data.data)

      } catch(error){
      console.log(error)
      }
}
useEffect(()=>{
  FarmaciasData();
},[])
  const HandleGestores = async(e)=>{
    e.preventDefault()
if((ConfimarSenha === Gestores.senha) && Gestores.email && Gestores.nome && Gestores.nomeusuario && Gestores.telefone && Gestores.senha){
    try {
      const res = await axios.post("http://localhost:8800/ges/cges", Gestores)

      if(res.data.data === "Sucess"){
      //  Navigate("/adminlistarGestor")
      toast.success("Sucesso")
    }else{
      toast.error(res.data.data)
    }
      
    } catch (error) {
      console.log(error)
      
    }
  }else{
      toast.warn("Erro!")
  }
}
  return (
    <>

    { IsAutenticado ?
       <>
      <LogActividades tipo={"administrador"}  />
      <HeaderAdmin  />
     <AdminSide  />
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

<section className="section">
        <div className="container">
             <div className="row">
                <div className="card" style={{height:'32rem'}}>
                  <span>Campos com Validações</span>
                  <span>Todos os campos devem ser devidamente preenchidos</span>
                  <hr />
                   <span>Informções de identificação</span>
                   <div className="d-flex " style={{gap:'5rem'}} >
                      <input className='form-control' type="text" required placeholder='Nome' onChange={(e)=> setGestores({...Gestores, nome: e.target.value})} />
                      <input className='form-control' type="text" required placeholder='Nome usuario*'  onChange={(e)=> setGestores({...Gestores, nomeusuario: e.target.value})} />
                    
                  </div>
                 <span>Conctacto</span>
                  <div className="contacto d-flex" style={{gap:'5rem'}}>
                      <input className='form-control' type="text" required  placeholder='Numero de telefone*'  onChange={(e)=> setGestores({...Gestores, telefone: e.target.value})}/>
                      <input className='form-control' type="email" required  placeholder='Email*'  onChange={(e)=> setGestores({...Gestores, email: e.target.value})}/>
                  </div>
                  <hr />
                  <span>Credencias</span>
                 <div className="senha d-flex"style={{gap:'5rem'}}>
                      <input className='form-control' type="pass" required  placeholder='Palavra passe*'  onChange={(e)=> setGestores({...Gestores, senha: e.target.value})}/>
                      <input className='form-control' type="pass" required  placeholder='confirmar Palavra passe*' value={ConfimarSenha} onChange={(e)=> setConfirmar(e.target.value)}/>
                 </div>
                 <hr />
                     <div className="d-flex"style={{flexDirection:'column',gap:'0.4rem'}}>
                        <span>Gerenciar</span>

                         <select className='select-group select-group-left form-control"' value={Gestores.farmacia} onChange={(e)=> setGestores({...Gestores, farmacia: e.target.value})} >
                            <option value="">Escolher a Farmacia para Gerenciar</option>
                            { load && 
                              Farmacias.map((farma)=>(
                                <option key={farma.id} value={farma.id}>{farma.nome}</option>
                              ))
                            }
                         </select>
                     </div>
                    <button onClick={HandleGestores} className='btn btn-success'style={{marginTop:'3rem',backgroundColor:'#00968c'}}>Cadastrar</button>
                </div>
            </div>    
        </div>      
</section>
</main>
<FooterDashboard />
       </>
:
<div>Voce não está Autenticado faça login</div>}
       </>
  )
}


