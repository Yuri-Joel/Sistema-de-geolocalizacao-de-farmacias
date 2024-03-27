import { useEffect, useState } from "react"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"
import { Link } from "react-router-dom"
import FooterDashboard from "../../../../components/footer/footer"
import { toast } from "react-toastify"
import { Formattime } from "../AdminMensagens/AdminMensagens"
import { api } from "../../../../../api"



export const ObterLog = () => {

    const IsAutenticado = !!localStorage.getItem("usuario")
    const [Log, setLog] = useState([])
    const admin = localStorage.getItem("usuario")

    const ListarLog = async () => {

        const tipo = "administrador"
        try {
            const res = await api.get(`/log/log/${admin}/${tipo}`)
            setLog(res.data.data)
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        ListarLog()
    }, [])


     const EliminarTudo = async()=>{
         const id = "tudo"
                try {
                    const res = await api.delete(`/log/dele/${id}`)
                        toast.success(res.data.data)
                         ListarLog()
                } catch (error) {
                    console.log(error)
                }
    }

    const Eliminar = async(id)=>{
        try {
            const res = await api.delete(`/log/del/${id}`)
                toast.success(res.data.data)
                 ListarLog()
        } catch (error) {
            console.log(error)
        }
}


    return (
        <>
        { IsAutenticado ?
        <>
            <HeaderAdmin />
            <AdminSide />
            <LogActividades tipo={"administrador"} />
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
                                    <thead>
                                        <tr>
                                            <th><button className="btn btn-primary" onClick={()=> EliminarTudo("tudo")}>Limpar</button></th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>caminho</th>
                                            <th>Data</th>
                                            <th>detalhes</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Log.map((logA) => (
                                                <tr key={logA.id}>

                                                    <td>{logA.id}</td>
                                                    <td>{logA.caminho_url}</td>
                                                    <td>{Formattime(logA.data_atividade)}</td>
                                                    <td>{logA.detalhes}</td>
                                                    <td><button className="btn btn-danger" onClick={()=> Eliminar(logA.id)}>Eliminar</button></td>
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
        <div>Voce não está Autenticado, Por favor faça Login</div>

        }
        </>
    )
}