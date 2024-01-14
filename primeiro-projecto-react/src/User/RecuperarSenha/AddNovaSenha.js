import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom";
import k from '../../assets/Geo Farma/Geo.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/util/scrollbar'




export const AddNovaSenha = ()=>{
        const Navigate = useNavigate()
const {id} = useParams();
const [novaSenha, setnovaSenha]= useState('')

    const handleSubmit =async(e)=>{
        
        e.preventDefault();
try {
    const res = await  axios.post(`http://localhost:8800/rede/novasenha`,{id, novaSenha})
            
            console.log(res.data.message)
           
            if(res.data.message === "Actualizada"){
                toast.success(res.data.message) 
                Navigate("/login")
            }   else{
               toast.warn(res.data.message)
            }
} catch (error) {
    console.log(error)
}
      
    }
    
    return(
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
                  
                   <div className="d-flex align-items-center justify-content-center flex-column" style={{color:'white',textAlign:'center'}}> 
                   <span>faça o Login com as informações pessoais</span>
                    
                    </div>
                    <Link to={'/login'}>
                    <button style={{color:'white',width:'11.5rem',marginTop:'1rem',height:'2rem',border:' 1px solid white',borderRadius:'0.5rem',backgroundColor:'#00968c'}}>Login</button> 
                    </Link>
               </div>

                   <div className="card d-flex flex-column align-items-center justify-content-center" style={{width:'24rem',height:'27rem',gap:'1rem'}}>
                       <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4" style={{color:'#00968c',marginTop:'-3rem'}}>Nova Senha</h5>
                  
                      </div>
                      <div>
                       <label className='form-control'>Digite a sua nova senha:</label>
                     <input className='form-control'  value={novaSenha} onChange={(e)=> setnovaSenha(e.target.value)} placeholder="Digite sua nova senha" />
                     </div>
                      
                       <Link ><button  style={{width:'15rem',height:'2rem',backgroundColor:'#00968c',color:'white',border:'none',borderRadius:'0.3rem'}}
                               onClick={handleSubmit}
                       >Salvar</button></Link>     
                       
                   </div>
               </div>
           </div>
           </section>
         
       </main>
        
     
        </>
    )
}