import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import imagem from '../../../../../assets/Screenshot_20240110-233026.png'
import { Card, CardGroup, CardHeader, CardBody, CardTitle } from "react-bootstrap";
import { Link } from 'react-router-dom';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import AdminSide from '../../../../components/aside/admin/adminSide';
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades';
import { api } from '../../../../../api';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'




export const AdminListarUsuario = () => {

    const IsAutenticado = !!localStorage.getItem("usuario")
    const [users, setusers] = useState([])


    const ListarUsuario = async () => {
        try {

            const res = await api.get(`/api/dados`)
            setusers(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const [valorDeletado, setvalordeletado] = useState(" ")
    
    const Deletar = async (id) => {
        console.log(id);
        try {
            handlefechar();
            const res = await api.delete(`/api/deletar/${id}`)
            toast.success(res.data.data)
            ListarUsuario();
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ListarUsuario()
    }, [])
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    return (
        <>
            {IsAutenticado ?
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
                                        <CardGroup>
                                            <Card style={{ height: '100vh', backgroundColor: 'transparent' }} >
                                                <CardHeader>
                                                    <CardTitle>Usuários</CardTitle>
                                                </CardHeader>
                                                <CardBody >

                                                    <div style={{ height: 80 + 'vh', overflow: "auto" }}>
                                                        {users.map((user) => (
                                                            <Card key={user.id} style={{ borderRadius: '1.625rem', border: '2px solid #00968b', boxShadow: '0rem 0.125rem 0.6rem #00968b', backgroundBlendMode: 'normal' }}>
                                                                <CardBody style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                                        <CardTitle>
                                                                            {
                                                                                user.foto ?
                                                                                    <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={`http://localhost:8800/${user.foto}`} alt='profile' />
                                                                                    :
                                                                                    <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={imagem} alt='carregando...' />
                                                                            }
                                                                        </CardTitle>

                                                                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                                                                            <div>Nome: {user.nome}</div>
                                                                            {/* <img src={user.photo} alt={user.name} /> */}
                                                                            <div>E-mail: {user.email}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                                                            <i className="bi bi-trash" onClick={() => { handleabrir(); setvalordeletado(user.nome)}}></i>

                                                                        </Link>
                                                                        <Modal show={abrir}>
                                                                            <Modal.Header>
                                                                                <Modal.Title>Eliminar usuario</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>eliminar {valorDeletado} do sistema?</Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button variant='success' onClick={handlefechar}>
                                                                                    Cancelar
                                                                                </Button>
                                                                                <Button variant='danger' onClick={() => Deletar(user.id)}>
                                                                                    Eliminar
                                                                                </Button>
                                                                            </Modal.Footer>
                                                                        </Modal>
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
                            </nav>

                        </div>

                    </main>
                    <FooterDashboard />
                </>
                :
                <>
                    Você não está Autenticado!
                </>
            }
        </>
    )
}
