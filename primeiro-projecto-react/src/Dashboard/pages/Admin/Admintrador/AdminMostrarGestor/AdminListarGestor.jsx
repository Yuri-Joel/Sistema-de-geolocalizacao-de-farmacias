import { useEffect, useState } from "react"
import imagem from '../../../../../assets/Screenshot_20240110-233026.png'
import { toast } from 'react-toastify'
import { Card, CardGroup, CardHeader, CardBody, CardTitle, CardText} from "react-bootstrap";
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin";
import AdminSide from '../../../../components/aside/admin/adminSide'
import { Link } from "react-router-dom";
import FooterDashboard from "../../../../components/footer/footer";
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades";
import { api } from "../../../../../api";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

export const AdminListarGestor = () => {

    const IsAutenticado = !!localStorage.getItem("usuario")
    const [Gestores, setGestores] = useState([])

    const ListarGestor = async () => {

        try {
            const res = await api.get(`/ges/todos`)
            setGestores(res.data.data)
          
        } catch (error) {

        }
    }
    const [valordeletado, setvalordeletado]= useState("")
    const Deletar = async (id) => {
        console.log(id);
        handlefechar()
        try {

            const res = await api.delete(`/ges/delges/${id}`)
            toast.success(res.data.data)
            ListarGestor();
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        ListarGestor();
    }, [])
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    return (
        <>
        { IsAutenticado ?
        <>

            <LogActividades  tipo={"administrador"} />
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
                                <CardGroup>
                                    <Card style={{ height: '100vh',backgroundColor: 'transparent' }} >
                                        <CardHeader>
                                            <CardTitle>Gestores</CardTitle>
                                        </CardHeader>
                                        <CardBody >
                                            <div style={{ height: 80 + 'vh', overflow: "auto" }}>
                                                {Gestores.map((gestores) => (
                                                    <Card key={gestores.id} style={{borderRadius:'1.625rem',border:'1px solid #00968b',boxShadow:'0rem 0.125rem 0.6rem #00968b',backgroundBlendMode:'normal'}}>
                                                        <CardBody style={{width: '80%', display: 'flex',alignItems:'center',justifyContent:'space-between'}}>
                                                            <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                                                            <CardTitle>
                                                                {
                                                                    gestores.foto ?
                                                                        <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={`http://localhost:8800/${gestores.foto}`} alt="profile" />
                                                                        :
                                                                        <img style={{ width: '4rem', height: '4rem' }} className="rounded-circle" src={imagem} alt='carregando...' />
                                                                }
                                                            </CardTitle>

                                                            <Card style={{ display: 'flex', flexDirection: 'column' }} >
                                                            <div>Nome: {gestores.nome}</div>
                                                                {/* <img src={user.photo} alt={user.name} /> */}
                                                                <div>E-mail: {gestores.email}</div>
                                                            </Card>
                                                            </div>
                                                            <div>
                                                                <Link className="btn btn-danger btn-sm" onClick={()=>{handleabrir(); setvalordeletado(gestores.nome)}} title="Remover gestor">
                                                            <i className="bi bi-trash bg-danger" ></i>  
                                                              </Link>
                                                                <Modal show={abrir}>
                                                                    <Modal.Header>
                                                                        <Modal.Title>Eliminar Gestor</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>eliminar {valordeletado} do sistema?</Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant='success' onClick={handlefechar}>
                                                                            Cancelar
                                                                        </Button>
                                                                        <Button variant='danger' onClick={() => Deletar(gestores.id)}>
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
    Você não está Autenticado por favor faça Login
    </>    
    }
        </>
    )
}