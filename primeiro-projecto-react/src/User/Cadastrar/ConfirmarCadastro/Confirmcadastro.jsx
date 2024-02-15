import React,{ useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom"
import k from '../../../assets/Geo Farma/Geo.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/util/scrollbar'
import "../../../pagesHome/Login/loading.css"


export const ConfirmCadastro = ()=>{

    const Navigate = useNavigate()
    const [token, setInput] = useState('');
    const [loading, setloading] = useState(false)
    const Dados = localStorage.getItem("dados")


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setloading(true)

      const   Values = JSON.parse(Dados)

        Values.token = token ;
        

        try {
            const res =  await  axios.post(`http://localhost:8800/api/confirmcadastro`,Values)
            if(res.data.data === 'Sucess'){
                localStorage.removeItem("dados")
                toast.success("Cadastrado com sucesso!")
                Navigate(`/login`)
            } else{
               toast.warn(res.data.data) 
            }
          
        } catch (error) {
            console.log(error)
        } finally {
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
                  
                   <div className="d-flex align-items-center justify-content-center flex-column" style={{color:'white',textAlign:'center'}}> 
                   <span>faça o Login com as informações pessoais</span>
                    
                    </div>
                    <Link to={'/login'}>
                    <button style={{color:'white',width:'11.5rem',marginTop:'1rem',height:'2rem',border:' 1px solid white',borderRadius:'0.5rem',backgroundColor:'#00968c'}}>Login</button> 
                    </Link>
               </div>

                   <div className="card d-flex flex-column align-items-center justify-content-center" style={{width:'24rem',height:'27rem',gap:'1rem'}}>
                       <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4" style={{color:'#00968c',marginTop:'-3rem'}}>Verficar</h5>
                  
                      </div>
                      <div>
                       <label className='form-control'>Digite aqui:</label>
                  <input className='form-control' placeholder="Digite aqui os digitos enviados no seu email " value={token} onChange={(e)=> setInput(e.target.value)} />
                    
                     </div>
                      
                       <Link ><button  style={{width:'15rem',height:'2rem',backgroundColor:'#00968c',color:'white',border:'none',borderRadius:'0.3rem'}}
                               onClick={handleSubmit}
                       >Verificar</button></Link>     
                       
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