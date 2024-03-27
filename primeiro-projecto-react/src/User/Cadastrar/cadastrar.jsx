import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/util/scrollbar'
import {Link} from'react-router-dom'
import { useState } from 'react';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import  k from'../../assets/Geo Farma/Geo Farma.png'
import "../../pagesHome/Login/loading.css"
import { api } from '../../api';

export default function Cadastrar() {
  const Navigate = useNavigate()
   
  const [Cadastro, setCadastro]= useState({
      nome: '',
      telefone: '',
      email:'',
      senha:''
  })
  const [confirmSenha , setsenha] = useState('')
  const [loading, setloading] = useState(false)

 const handleSubmit = async(e)=>{
  
  e.preventDefault();
  setloading(true)  ;
   try {
      if(( confirmSenha  ===  Cadastro.senha) && Cadastro.nome.trim() && Cadastro.email.trim() && Cadastro.senha.trim() && Cadastro.telefone.trim()){
   
        const res = await api.post(`/api/cadastro`, Cadastro)
       
          
           if(res.data.status === "Sucess"){
            
            //  localStorage.setItem("dados", JSON.stringify(res.data.values))
               Navigate("/login")
           } else {
               toast.warn(res.data.status);
           }
   } else{
        toast.warn("Erro!")
   }
   }
        catch (error) {
     toast.warn(error)
   }
   finally{
     setloading(false) 
   }
 
   
    }
  return (
    <>
  
       <main>
       <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
           <div className="container ">
           <div className=" justify-content-center d-flex  align-items-center row">    
                   <div className="card  align-items-center justify-content-center" style={{width:'21.1rem',height:'26rem',backgroundColor:'#00968c'}}>
                 <div className="d-flex align-items-center justify-content-center flex-column" style={{marginTop:'-5rem'}}>
                 <img src={k} style={{width:'8rem',height:'8rem',marginLeft:'2rem'}} alt=""/>
                  <span style={{color:'white',marginTop:'-2rem',fontSize:'1.4rem'}}>GeoFarma</span>
                 </div>
                  
                   <div className="d-flex align-items-center justify-content-center flex-column" style={{color:'white'}}> 
                    <span>Para fazer o uso da Nossa Geolocalização</span> <span>faça o Login com as informações pessoais</span>
                    
                    </div>
                    <Link to={'/login'}>
                    <button style={{color:'white',width:'11.5rem',marginTop:'1rem',height:'2rem',border:' 1px solid white',borderRadius:'0.5rem',backgroundColor:'#00968c'}}>Login</button> 
                    </Link>
               </div>

                   <div className="card d-flex flex-column align-items-center justify-content-center" style={{width:'24rem',height:'27rem',gap:'1rem'}}>
                       <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4" style={{color:'#00968c',marginTop:'-3rem'}}>Criar Conta</h5>
                  
                      </div>
                    
                      <input className='form-control' type="text" placeholder='Nome*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}}  onChange={e => setCadastro({...Cadastro, nome: e.target.value})} />
                      <input className='form-control' type="text" placeholder='Numero de Telemovel*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}} onChange={e => setCadastro({...Cadastro, telefone: e.target.value})}/>
                      <input className='form-control' type="text" placeholder='Email*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}} onChange={e => setCadastro({...Cadastro, email: e.target.value})} />
                      <input className='form-control' type="password" placeholder='Senha*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}} onChange={e => setCadastro({...Cadastro, senha: e.target.value})}/>
                      <input className='form-control' type="password" placeholder='Confirmar a senhha*' style={{width:'15rem',height:'2rem',backgroundColor:'#00968c55',border:'none',borderRadius:'0.3rem'}} value={confirmSenha} onChange={e => setsenha(e.target.value)} />
                       <Link  ><button onClick={handleSubmit} style={{width:'15rem',height:'2rem',backgroundColor:'#00968c',color:'white',border:'none',borderRadius:'0.3rem'}}> Cadastrar</button></Link>
                     
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
