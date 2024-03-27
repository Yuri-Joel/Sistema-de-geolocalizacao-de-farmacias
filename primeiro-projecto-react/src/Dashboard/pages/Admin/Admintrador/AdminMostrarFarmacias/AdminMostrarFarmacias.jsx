import { useEffect, useState } from 'react'
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin'
import AdminSide from '../../../../components/aside/admin/adminSide'
import { Link } from 'react-router-dom'
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades'
import FooterDashboard from '../../../../components/footer/footer'
import { api } from '../../../../../api'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

export const AdminMostrarFarmacias = () => {
    const [Farmacias, setFarmacias] = useState([])

    const IsAutenticado = !!localStorage.getItem("usuario")
    const ListarFarmacias = async () => {
        try {

            const res = await api.get(`/f/todasfarma`)
            setFarmacias(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const [valorDeletado, setvalordeletado] = useState(" ")
    const [loadDeletado, setDeletado] = useState(false)
    const Deletar = async (id) => {
        handlefechar();
        try {

           await api.delete(`/f/delfarma/${id}`)
            ListarFarmacias();
            setDeletado(true)
            setTimeout(() => {
                setDeletado(false)
            }, 5000)
           
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ListarFarmacias()
    }, [])
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
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
                                {(loadDeletado &&
                                    <div className="alert alert-danger">
                                        Deletado com sucesso
                                    </div>)}
                        <div className="card info-card sales-card   min-vh-40" style={{ height: '30rem' }}>
                            <table className='table'>
                                <thead style={{textAlign:'center'}}>
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
                                        <tbody style={{ textAlign: 'center' }}>
                                    {
                                        Farmacias.map((farmas) => (
                                            <tr key={farmas.id}>
                                                <th>{farmas.nome}</th>
                                                <th>{farmas.email}</th>
                                                <th>{farmas.endereco}</th>
                                                <th>{farmas.nif}</th>
                                                <th>{farmas.horaAbertura + " às "+ farmas.horaFechamento}</th>
                                                <th>
                                                    <Link className="btn btn-success btn-sm" title="Remove my profile image" to={`/editfarma/${farmas.id}`}>
                                                      <span>Editar</span>
                                                    </Link>
                                                </th>
                                                <Modal show={abrir}>
                                                    <Modal.Header>
                                                        <Modal.Title>Tens a certeza que queres eliminar?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>eliminar {valorDeletado} ?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant='success' onClick={handlefechar}>
                                                            Cancelar
                                                        </Button>
                                                        <Button variant='danger' onClick={() => Deletar(farmas.id)}>
                                                            Eliminar
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <th>
                                                    <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                                        <i className="bi bi-trash bg-danger" onClick={() => { handleabrir(); setvalordeletado(farmas.nome) }} > </i>
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