import { useEffect, useState } from "react"
import imagem from '../../assets/Screenshot_20240110-233026.png'
import { toast } from "react-toastify"
import { HeaderGestor } from "../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../Dashboard/components/footer/footer"
import { Link } from "react-router-dom"
import { Card, CardBody, CardGroup, CardHeader, CardText, CardTitle } from "react-bootstrap"
import { LogActividades } from "../../Log_Actividades/Log_actividades"
import { api } from "../../api"
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

export const ListarSubGestor = () => {

    const [Subgestor, setSubgestor] = useState([])
    const id = localStorage.getItem("usuario")

    const ListarsubGestor = async () => {
        try {

            const res = await api.get(`/sub/subgestor/${id}`)
            console.log(res.data);
            setSubgestor(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        ListarsubGestor();
    }, [])
    const [valorDeletado, setvalordeletado] = useState(" ")
    const [loadDeletado, setDeletado] = useState(false)
    const Eliminar = async (id) => {
        try {
            const res = await api.delete(`/sub/subdelges/${id}`)
            ListarsubGestor();
            setDeletado(true)
            setTimeout(() => {
                setDeletado(false)
            }, 5000)
          
        } catch (error) {
            console.log(error)
        }
    }
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    return (
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
                            <li className="breadcrumb-item active">Dashboard/</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                    <div className="row">
                        <CardGroup>
                            <Card style={{ height: '100vh', backgroundColor: 'transparent' }} >
                                <CardHeader>
                                    <CardTitle>Subgestor</CardTitle>
                                </CardHeader>
                                <CardBody >
                                    <div style={{ height: 80 + 'vh', overflow: "auto" }}>
                                        {Subgestor.map((sub) => (
                                            <Card key={sub.id} style={{ borderRadius: '1.625rem', border: '2px solid #00968b', boxShadow: '0rem 0.125rem 0.6rem #00968b', backgroundBlendMode: 'normal' }}>
                                                <CardBody style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        <CardTitle>
                                                            {
                                                                sub.foto ?
                                                                    <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={`http://localhost:8800/${sub.foto}`} alt='profile' />
                                                                    :
                                                                    <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={imagem} alt='carregando...' />
                                                            }
                                                        </CardTitle>

                                                        <CardText style={{ display: 'flex', flexDirection: 'column' }} >
                                                            <span>Nome: {sub.nome}</span>
                                                            {/* <img src={user.photo} alt={user.name} /> */}
                                                            <span>E-mail: {sub.email}</span>
                                                        </CardText>
                                                    </div>
                                                    <div>
                                                        <Modal show={abrir}>
                                        <Modal.Header>
                                            <Modal.Title>Eliminar Funcionario da farmácia?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>eliminar {valorDeletado} da farmacia?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant='success' onClick={handlefechar}>
                                                Cancelar
                                            </Button>
                                            <Button variant='danger' onClick={() => Eliminar(sub.id)}>
                                                Eliminar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                        <i className="bi bi-trash" onClick={() => { handleabrir(); setvalordeletado(sub.nome) }}></i>

                                                        </Link>
                                                    </div>
                                                </CardBody>

                                            </Card>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>

                    </div>
                </div>

            </main>
            <FooterDashboard />
        </>
    )

}