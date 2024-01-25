import React,{ useState } from "react"
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderUser from "../../Dashboard/components/heder/user/headerUser";
import { Nome } from "../../components/NomeUser/Nome";
import UserSide from "../../Dashboard/components/aside/user/userSide";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import { LogActividades } from "../../Log_Actividades/Log_actividades";


export const Comentarios = ()=>{
    
const {usuario} = useParams()
const [texto, setTexto] = useState('');


const HandleSubmit = async(e)=>{
    e.preventDefault()
    try {
        const res = await axios.post("http://localhost:8800/sms/novasms", {usuario, texto})
            if(res.data.data === "Sucess"){
                toast.success("Enviada com Sucesso");
                console.log(res.data)
            } else{
                toast.error("ERRO!")
            }

    } catch (error) {
        console.log(error)
    }
 

}
    return(
        <>
       
          < HeaderUser nome={<Nome />} />
     
         <UserSide />

  <LogActividades />
         <main id="main" className="main" style={{backgroundColor:'#00968c53'}}>
            <div className="pagetitle">
      <h1 style={{color:'white'}}>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/map'}>Map</Link></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    <section className="section dashboard section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="row">       
   <div className="card info-card sales-card   min-vh-40" style={{height:'30rem'}}>
  
       <form onSubmit={HandleSubmit}>
            
            <div>
    < textarea style={{height:'15rem',width:'15rem'}}  value={texto} onChange={(e)=> setTexto(e.target.value)} placeholder="Digite a sua questão, reclamação, inovações" />

         </div>
        <div>
            <button className="btn" style={{backgroundColor:'#00968c'}} type="submit">Comentar</button>
    
        </div>
    </form>

    </div>
    
    </div> 
    
    </section>
            
            </main>
         
        </>
    )
}