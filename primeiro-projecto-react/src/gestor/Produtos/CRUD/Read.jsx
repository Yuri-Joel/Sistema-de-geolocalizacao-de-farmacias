import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HeaderGestor } from "../../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../../Dashboard/components/footer/footer"
import { Button, Card, Image } from "react-bootstrap"
import { LogActividades } from "../../../Log_Actividades/Log_actividades"
import { api } from "../../../api"
import Modal from 'react-bootstrap/Modal'




export const ReadProdutos = () => {

    const [Products, setProducts] = useState([])
    const [load, setload] = useState(false)
    const farma = localStorage.getItem("farma");
    const subgestor = localStorage.getItem("subgestor");
    //const Idgestor = localStorage.getItem("usuario")

    const ListarProdutos = async () => {

        try {

            const res = await api.get(`/m/farmamed/${farma}`)
            setProducts(res.data.data)
            setload(true)

        } catch (error) {

            console.log(error)

        }


    }
    useEffect(() => {
        ListarProdutos();
    }, [])

    const Eliminar = async (id) => {
        handlefechar()
        try {
            const res = await api.delete(`/m/delmed/${id}/${subgestor}`)
            toast.success(res.data.data)
            ListarProdutos();
        } catch (error) {
            console.log(error)
        }
    }

    const Disponivel = async (item, id) => {

        const dispo = (item === "disponivel") ? "indisponivel" : "disponivel"

        console.log(dispo)
        try {
            const res = await api.put(`/m/dispomed/${id}`, { dispo })
            toast.success(res.data.data)
            ListarProdutos();
        } catch (error) {
            console.log(error)
        }
    }
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    const[valorDeletado, setvalordeletado] = useState(" ")
    return (
<>
<LogActividades tipo={"gestor"} />
<HeaderGestor />
<GestorSide />
{
( load && <>


<main main id="main" className="main" >
<section className='section'>
<div className="container">
<div className="row">
<div className="col-md-12">
<Card style={{ height: '100vh' }}>
    <h1>Lista de Medicamentos</h1>
<div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
{Products.map((medicine, index) => (
<div className="col-md-4" key={index}>
<Card style={{ borderRadius: '1rem' }}>
<Card.Body>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div className="filter">
        <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
                <h6>Detalhes</h6>
             </li>
                                    <Link style={{cursor:'pointer'}} to={`/editarproduto/${medicine.id}`}>
                                        Editar
                                    </Link>
                                    <li>{medicine.data_validade}</li>
                                    <li>{medicine.tipo}</li>
                                    <li>{medicine.informacoes}</li>
                                </ul>
                            </div>

                            {/* &#9829;  <i

                                style={{ color: medicine.favorito_id ? 'red' : 'gray', width: '2rem', height: '2rem' }}
                                className='bi bi-heart-fill'>

                                    </i> */}

                        </div>
                        <Image style={{ width: '9rem', height: '9rem' }} className="img-fluid rounded-start " src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.name} />
                      
<h5 className="card-title">{medicine.nome}</h5>
<h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
<h6><strong>{medicine.disponibilidade}</strong></h6>
<h6><strong>{medicine.data_validade}</strong></h6>
<Button variant="success" style={{margin: "0.5rem"}} onClick={() => Disponivel(medicine.disponibilidade, medicine.id)}>{ medicine.disponibilidade === "disponivel" ? "Indisponibilidade" : "Disponibilidade" }</Button>
                <Button variant="danger" onClick={() => { handleabrir(); setvalordeletado(medicine.nome) }} className="mr-2">
<i className="bi bi-trash" ></i>
</Button>
                    </Card.Body>
                </Card>
        <Modal show={abrir}>
            <Modal.Header>
                <Modal.Title>Eliminar Medicamento ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>eliminar {valorDeletado} da Farmacia?</Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={handlefechar}>
                    Cancelar
                </Button>
                <Button variant='danger' onClick={() => Eliminar(medicine.id)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>

            </div>
            
        ))}
    </div>
</Card>
</div>
</div>
</div>
</section>   
</main>

                
                 </>
                )
            }
         <FooterDashboard />
 </>
    )}