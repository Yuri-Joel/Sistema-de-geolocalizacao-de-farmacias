import { useEffect, useState } from "react"
import imagem from '../../assets/Screenshot_20240110-233026.png'
import axios from "axios"
import { toast } from "react-toastify"
import { HeaderGestor } from "../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../Dashboard/components/footer/footer"
import { Link } from "react-router-dom"
import { Card, CardBody, CardGroup, CardHeader, CardText, CardTitle } from "react-bootstrap"
import { LogActividades } from "../../Log_Actividades/Log_actividades"

export const ListarSubGestor = () => {

    const [Subgestor, setSubgestor] = useState([])
    const id = localStorage.getItem("usuario")

    const ListarsubGestor = async () => {
        try {

            const res = await axios.get(`http://localhost:8800/sub/subgestor/${id}`)
            console.log(res.data);
            setSubgestor(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        ListarsubGestor();
    }, [])

    const Eliminar = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8800/sub/subdelges/${id}`)
            ListarsubGestor();
            toast.success(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
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
                                                            <div>Nome: {sub.nome}</div>
                                                            {/* <img src={user.photo} alt={user.name} /> */}
                                                            <div>E-mail: {sub.email}</div>
                                                        </CardText>
                                                    </div>
                                                    <div>
                                                        <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                                            <i className="bi bi-trash" onClick={() => Eliminar(sub.id)}></i>

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