import axios from "axios"
import { useEffect, useState } from "react"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"
import FooterDashboard from "../../../../components/footer/footer"
import {toast} from 'react-toastify'



export const AdminMensagens = () => {

    const [sms, Setsms] = useState([])

    const Showsms = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/sms/mostra`)
            Setsms(res.data.data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        Showsms();
    }, [])

    const Eliminar = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:8800/sms/apagarsms/${id}`)
                    toast.success(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>     <HeaderAdmin />
            <AdminSide />
            <LogActividades />
            <main className="main" id="main">
                <div className="container">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Data de envio</th>
                                    <th>Mensagem</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                sms.map((mensagems, index) => (
                                        <tr key={index}>
                                            <th>{mensagems.nome}</th>
                                            <th>{mensagems.data_envio}</th>
                                            <th>
                                             <textarea className="textarea" name="" id="" cols="30" rows="6"
                                             value={mensagems.mensagem} disabled
                                             />
                                            
                                            </th>
                                            <th><button className="btn btn-danger" onClick={()=> Eliminar(mensagems.id)}>Eliminar</button></th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <FooterDashboard />
        </>
    )
}