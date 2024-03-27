import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { LogActividades } from "../../../../../../Log_Actividades/Log_actividades";
import HeaderAdmin from "../../../../../components/heder/admin/headerAdmin";
import AdminSide from "../../../../../components/aside/admin/adminSide";
import { Link } from "react-router-dom";
import FooterDashboard from "../../../../../components/footer/footer";
import { api } from "../../../../../../api";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'




export const ListarAdmin = ()=>{

    const IsAutenticado = !!localStorage.getItem("usuario")
const [admin, setadmin] = useState([]);
    const Listar = async()=>{
        try {
            
            const res = await api.get(`/ad/todos`)
            setadmin(res.data.data)
            console.log(res.data.data);
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        Listar();
    },[])

const TornarAdmin = async (id, value)=>{
            
    try {
        const res = await api.post(`/ad/tornar`,{id, value})
      
        if (res.data.data === "Adicionado como Admin principal"){
            
            toast.success("Adicionado como admin Principal")
           
        } else{
            toast.warn(res.data.data)
        }
        Listar();
    } catch (error) {
        console.log(error)
    }

}
    const [valordeletado, setvalordeletado]= useState("")
const EliminarAdmin = async(id)=>{
    handlefechar()
    try {
        const res = await api.delete(`/ad/delete/${id}`)
      
        if (res.data.data === "Sucess"){
            toast.success("Admin Eliminado")
            Listar()
            
        }
    } catch (error) {
        console.log(error)
    }

    }
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    return(
        <>
        { IsAutenticado ?
        <>
        <LogActividades tipo={"administrador"} />
        <HeaderAdmin />
        <AdminSide />
        <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/admin'}>Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div className="container">
                            <div className="row">
                                <table className="table">
                                      <thead style={{textAlign:'center'}}> 
                                          <tr>
                                           <th>Nome</th>
                                           <th>Email</th>
                                           <th>Cargo</th>
                                           <th>Eliminar</th>
                                           </tr>
                                      </thead>
                                            <tbody style={{ textAlign: 'center' }}>
                                         {
                                            admin.map((adm,index)=>(
                                                <tr key={index}>
                                                  <th>{adm.nome}</th>
                                                  <th>{adm.email}</th>
                                                    <th><button className="btn btn-success" onClick={() => TornarAdmin(adm.id, adm.administrador_principal)}>{adm.administrador_principal ?
                        
                        <>Remover Admin Principal</> : <> Tornar Admin Principal</> }</button>
                                                 </th>
                                                    <th> <button className="btn btn-danger" onClick={()=>{handleabrir(); setvalordeletado(adm.nome)}} >Eliminar</button> </th>
                                                    <Modal show={abrir}>
                                                        <Modal.Header>
                                                            <Modal.Title>Eliminar adm</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>eliminar {valordeletado} do sistema?</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant='success' onClick={handlefechar}>
                                                                Cancelar
                                                            </Button>
                                                            <Button variant='danger' onClick={() => EliminarAdmin(adm.id)}>
                                                                Eliminar
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                 <th></th>
                                                </tr>

                                            ))
                                         }
                                      </tbody>
                                </table>
                            </div>

                        </div>
                    </nav>

                </div>

            </main>
        <FooterDashboard />
        </>
    :
    <div>
        Você não está Autenticado, por favor faça login
    </div>    
    }
        </>
    )

}