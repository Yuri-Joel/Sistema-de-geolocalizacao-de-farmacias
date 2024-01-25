import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import imagem from '../../../../../assets/Screenshot_20240110-233026.png'
import { Card, CardGroup, CardHeader, CardBody, CardTitle, CardText } from "react-bootstrap";
import { Link } from 'react-router-dom';
import FooterDashboard from '../../../../components/footer/footer';
import HeaderAdmin from '../../../../components/heder/admin/headerAdmin';
import AdminSide from '../../../../components/aside/admin/adminSide';
import { LogActividades } from '../../../../../Log_Actividades/Log_actividades';




export const AdminListarUsuario = () => {

    const [users, setusers] = useState([])


    const ListarUsuario = async () => {
        try {

            const res = await axios.get(`http://localhost:8800/api/dados`)
            setusers(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const Deletar = async (id) => {
        try {

            const res = await axios.delete(`http://localhost:8800/api/deletar/${id}`)
            toast.success(res.data.data)
            ListarUsuario();
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ListarUsuario()
    }, [])

    return (
        <>
            {/* {
                users.map((user) => (
                    <div key={user.id}>
                        <div>
                            {
                                user.foto ?
                                    <img src={`http://localhost:8800/${user.foto}`} />
                                    :
                                    <img src={imagem} alt='carregando...' />
                            }
                        </div>
                        <h5>{user.nome}</h5>
                        <h5>{user.email}</h5>
                        <div>
                            <button onClick={() => Deletar(user.id)}>Eliminar</button>
                        </div>
                    </div>
                ))

            } */}
            
           
            <HeaderAdmin />
            <AdminSide />
            <LogActividades />
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
                                    <Card style={{ height: '100vh',backgroundColor: 'transparent' }} >
                                        <CardHeader>
                                            <CardTitle>Usuários</CardTitle>
                                        </CardHeader>
                                        <CardBody >
                                            <div style={{ height: 80 + 'vh', overflow: "auto" }}>
                                                {users.map((user) => (
                                                    <Card key={user.id} style={{borderRadius:'1.625rem',border:'2px solid #00968b',boxShadow:'0rem 0.125rem 0.6rem #00968b',backgroundBlendMode:'normal'}}>
                                                        <CardBody style={{width: '80%', display: 'flex',alignItems:'center',justifyContent:'space-between'}}>
                                                            <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                                                            <CardTitle>
                                                                {
                                                                    user.foto ?
                                                                        <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={`http://localhost:8800/${user.foto}`} alt='profile' />
                                                                        :
                                                                        <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={imagem} alt='carregando...' />
                                                                }
                                                            </CardTitle>

                                                            <CardText style={{ display: 'flex', flexDirection: 'column' }} >
                                                            <div>Nome: {user.nome}</div>
                                                                {/* <img src={user.photo} alt={user.name} /> */}
                                                                <div>E-mail: {user.email}</div>
                                                            </CardText>
                                                            </div>
                                                            <div>
                                                            <Link  className="btn btn-danger btn-sm" title="Remove my profile image">
                                                                <i className="bi bi-trash" onClick={() => Deletar(user.id)}></i>
                                                                 
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
                    </nav>

                </div>

            </main>
            <FooterDashboard />
        </>
    )
}
