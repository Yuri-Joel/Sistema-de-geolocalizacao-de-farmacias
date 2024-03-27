import { useState } from "react"
import { toast } from "react-toastify";
import {Link, useNavigate} from 'react-router-dom'
import { HeaderGestor } from "../../Dashboard/components/heder/gestor/headerGestor";
import GestorSide from "../../Dashboard/components/aside/gestor/gestorSide";
import FooterDashboard from "../../Dashboard/components/footer/footer";
import { Card } from "react-bootstrap";
import { LogActividades } from "../../Log_Actividades/Log_actividades";
import { api } from "../../api";


export const CadastrarsubGestor = ()=>{
    
    const [loading, setloading] = useState(false)
const Navigate = useNavigate()
    const Idgestor = localStorage.getItem("usuario");

    const [Subgestor, setSubgestor] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        gestor: Idgestor 

    })
    const handleGestor = async(e)=>{
        e.preventDefault();
        setloading(true)
        if(Subgestor.senha && Subgestor.email && Subgestor.telefone && Subgestor.nome){
            try {
                const res = await api.post(`/sub/subcges`, Subgestor)
                console.log(res.data.data);
                if (res.data.data === "Sucess"){
                    toast.success(res.data.data)
                    Navigate("/listarsubgestor")
                } else{
                    toast.error(res.data.data)
                }
              

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        } else{
            toast.warn("ERRO! os Campos não podem ser vazios")
        }
       
    }

    return(
        <>
        <LogActividades tipo={"gestor"} />
        <HeaderGestor />
        <GestorSide />
        <main id="main" className="main">
                
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/gestor'}>Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard </li>
                        </ol>
                    </nav>
                </div>
                  <div className="container">
                     <div className="row">
                        <Card style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                        
                     <form onSubmit={handleGestor} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <div>
                <input className="form-control" required type="text" placeholder="nome do funcionario" onChange={(e)=> setSubgestor({...Subgestor, nome: e.target.value})} />
            </div>
            <div>
                <input className="form-control" required type="text" placeholder="email do funcionario" onChange={(e)=> setSubgestor({...Subgestor, email: e.target.value})} />
            </div>
            <div>
                <input className="form-control" required type="pass"placeholder="senha" onChange={(e)=> setSubgestor({...Subgestor,senha: e.target.value})} />
            </div>
            <div>
                <input className="form-control" required type="text" placeholder="9XX XXX XXX" onChange={(e)=> setSubgestor({...Subgestor, telefone: e.target.value})} />
            </div>
            <button className="btn btn-sucess" required style={{backgroundColor:'#00968c',color:'white'}} type="submit">Cadastrar</button>
           </form> 
           </Card>
                        {(loading &&
                            <div className="loading" id="loading">
                                <div className="spinner"></div>
                            </div>
                        )}
                     </div>
                  </div>
                </main>
       
           <FooterDashboard />
        </>
    )
}