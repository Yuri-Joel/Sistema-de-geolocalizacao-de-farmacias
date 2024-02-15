import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin'
import AdminSide from '../../../../components/aside/admin/adminSide'
import { Link } from 'react-router-dom'
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades'
import FooterDashboard from '../../../../components/footer/footer'

export const AdminMostrarFarmacias = () => {
    const [Farmacias, setFarmacias] = useState([])

    const IsAutenticado = !!localStorage.getItem("usuario")
    const ListarFarmacias = async () => {
        try {

            const res = await axios.get(`http://localhost:8800/f/todasfarma`)
            setFarmacias(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const Deletar = async (id) => {
        try {

            const res = await axios.delete(`http://localhost:8800/f/delfarma/${id}`)
            toast.success(res.data.data)
            ListarFarmacias();
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ListarFarmacias()
    }, [])

    return (
        <>
        { IsAutenticado ? 
        <>
            <LogActividades tipo={"administrador"} />
            <HeaderAdmin />
            <AdminSide />
            <main id="main" className="main" style={{ backgroundColor: '#00968c53' }} >
                <div className="pagetitle">
                    <h1 style={{ color: 'white' }}>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/admin'}>Map</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="card info-card sales-card   min-vh-40" style={{ height: '30rem' }}>
                            <table className='table table-borderless datatable'>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Endereço</th>
                                        <th>Nif</th>
                                        <th>Horario</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Farmacias.map((farmas) => (
                                            <tr key={farmas.id}>
                                                <th>{farmas.nome}</th>
                                                <th>{farmas.email}</th>
                                                <th>{farmas.endereco}</th>
                                                <th>{farmas.nif}</th>
                                                <th>{farmas.horario_funcionamento}</th>
                                                <th>
                                                    <Link className="btn btn-success btn-sm" title="Remove my profile image" to={`/editfarma/${farmas.id}`}>
                                                      <span>Editar</span>
                                                    </Link>
                                                </th>
                                                <th>
                                                    <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                                        <i className="bi bi-trash bg-danger" onClick={() => Deletar(farmas.id)} ></i>
                                                    </Link>
                                                </th>
                                            </tr >
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <FooterDashboard />
        </>
        : 
        <>
        Você não está Autenticado Por favor faça Login!
        </>
}
        </>
    )
}