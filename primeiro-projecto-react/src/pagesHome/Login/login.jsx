import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/util/scrollbar'
import {Link} from'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import k from '../../assets/Geo Farma/Geo.svg'
import "./loading.css"

export default function Login() {
  const Navigate = useNavigate();

  const [email, setemail] = useState("")
  const [senha, setsenha] = useState("")
  const [loading, setloading] = useState(false)
 

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setloading(true)
   
 try{
  if( email || senha ){
    const res = await  axios.post(`http://localhost:8800/l/login`, {email, senha})
     
          if(res.data.status === "Sucess"){
              const id = res.data.id
             if(res.data.tipo === "usuario"){
              
              localStorage.setItem("usuario", id);
            
              Navigate("/map");
             }
             else if(res.data.tipo === "gestor"){
              localStorage.setItem("usuario", id);
             
             }
             else if(res.data.tipo === "admin"){
              localStorage.setItem("usuario", id);

              Navigate("/admin")
             }
            
          } else{
             toast.error(res.data.status)
          }
  }
   else {
      toast.error("Preenche Todos os Campos")
  }
 } catch(error){
  console.error(error)
 } finally{
    setloading(false)
 }
  
}
  
  return (
    <>
   
       <main>
       <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
           <div className="container ">
           <div className=" justify-content-center d-flex  align-items-center row">    
                   <div className="card  align-items-center justify-content-center" style={{width:'20rem',height:'26rem',backgroundColor:'#00968c'}}>
                 <div className="d-flex align-items-center justify-content-center flex-column" style={{marginTop:'-5rem'}}>
                 <img src={k} style={{width:'8rem',height:'8rem',marginLeft:'2rem'}} alt=""/>
                  <span style={{color:'white',marginTop:'-2rem',fontSize:'1.4rem'}}>GeoFarma</span>
                 </div>
                  
                   <div className="d-flex align-items-center justify-content-center flex-column" style={{color:'white'}}> 
                    <span>Não tem uma conta na GeoFarma?</span> <span>faça o seu cadastramento</span>
                    
                    </div>
                    <Link to={'/cadastrar'}>
                    <button style={{color:'white',width:'11.5rem',marginTop:'1rem',height:'2rem',border:' 1px solid white',borderRadius:'0.5rem',backgroundColor:'#00968c'}}>Cadastra-se</button> 
                    </Link>
               </div>

                   <div className="card d-flex flex-column align-items-center justify-content-center" style={{width:'24rem',height:'27rem',gap:'1rem'}}>
                       <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4" style={{color:'#00968c',marginTop:'-3rem'}}>Login</h5>
                  
                      </div>
                       <input className='form-control' type="email" placeholder='Email*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}} 
                       value={email} onChange={(e)=> setemail(e.target
                        .value)}
                       />
                       <input className='form-control' type="password" placeholder='Senha*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}}
                             value={senha} onChange={(e)=> setsenha(e.target
                              .value)} 
                       />
                       <Link ><button  disabled={loading} style={{width:'15rem',height:'2rem',backgroundColor:'#00968c',color:'white',border:'none',borderRadius:'0.3rem'}}
                               onClick={handleSubmit}
                       >Login</button></Link>     
                       
                       <span ><Link style={{color:'#00968c'}} to={"/recuperar"}>Não sabes a tua senha?Recupera</Link> </span>
                   </div>
                   { ( loading &&
           <div className="loading" id="loading">
            <div className="spinner"></div>
                 </div>
            )}
               </div>
             
           </div>
           </section>
         
       </main>
       
    </>
  )
}
