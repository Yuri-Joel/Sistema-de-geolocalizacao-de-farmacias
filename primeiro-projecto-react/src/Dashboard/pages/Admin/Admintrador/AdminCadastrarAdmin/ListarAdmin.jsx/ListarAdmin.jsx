import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { LogActividades } from "../../../../../../Log_Actividades/Log_actividades";
import HeaderAdmin from "../../../../../components/heder/admin/headerAdmin";
import AdminSide from "../../../../../components/aside/admin/adminSide";
import { Link } from "react-router-dom";
import FooterDashboard from "../../../../../components/footer/footer";




export const ListarAdmin = ()=>{

    const IsAutenticado = !!localStorage.getItem("usuario")
const [admin, setadmin] = useState([]);
    const Listar = async()=>{
        try {
            
            const res = await axios.get(`http://localhost:8800/ad/todos`)
            setadmin(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        Listar();
    },[])

const TornarAdmin = async (id)=>{
            
    try {
        const res = await axios.post(`http://localhost:8800/ad/tornar`,{id})
      
        if (res.data.data === "Sucess"){
            
            toast.success("Adicionado como admin Principal")
            Listar();
        }
    } catch (error) {
        console.log(error)
    }

}

const EliminarAdmin = async(id)=>{
    try {
        const res = await axios.delete(`http://localhost:8800/ad/delete/${id}`)
      
        if (res.data.data === "Sucess"){
            toast.success("Admin Eliminado")
            Listar()
            
        }
    } catch (error) {
        console.log(error)
    }

}
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
                                <table className="table table-borderless datatable">
                                      <thead> 
                                          <tr>
                                           <th>Nome</th>
                                           <th>Email</th>
                                           <th>Cargo</th>
                                           <th>Eliminar</th>
                                           </tr>
                                      </thead>
                                      <tbody>
                                         {
                                            admin.map((adm,index)=>(
                                                <tr key={index}>
                                                  <th>{adm.nome}</th>
                                                  <th>{adm.email}</th>
                                                  <th><button className="btn btn-success" onClick={()=> TornarAdmin(adm.id)}>{adm.Administrador_principal?
                        
                        <>Remover Admin Principal</> : <> Tornar Admin Principal</> }</button>
                                                 </th>
                        <button className="btn btn-danger" onClick={()=> EliminarAdmin(adm.id)}>Eliminar</button>
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