import axios from "axios"
import { useEffect, useState } from "react"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"
import FooterDashboard from "../../../../components/footer/footer"
import {toast} from 'react-toastify'



export const Formattime = (time) => {
    const date = new Date(time)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `${formattedTime} ${formattedDate} `
}

export const AdminMensagens = () => {

    const IsAutenticado = !!localStorage.getItem("usuario")
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

            console.log(res.data);
                    toast.success(res.data.data)

                    Showsms()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        { IsAutenticado ?
        <>     <HeaderAdmin />
            <AdminSide />
            <LogActividades tipo={"administrador"} />
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
                                   
                                        <tr key={index} >
                                            <th>{mensagems.nome}</th>
                                            <th>{Formattime(mensagems.data_envio)}</th>
                                            <th>
                                             <textarea className="textarea"  cols="30" rows="6"
                                             value={mensagems.mensagem} disabled    />
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

        :
        <div>Voce não está Autenticado!!</div>
}
        </>
    )
}