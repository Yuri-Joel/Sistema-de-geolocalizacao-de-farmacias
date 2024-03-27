import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderUser from "../../../Dashboard/components/heder/user/headerUser";
import UserSide from "../../../Dashboard/components/aside/user/userSide";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import FooterDashboard from "../../../Dashboard/components/footer/footer";
import { Card } from "react-bootstrap";
import {LogActividades} from "../../../Log_Actividades/Log_actividades";
import { MyModal } from "../../component/Modal";
import { api } from "../../../api";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'



export const FavoritosMedicamentos = () => {


    const IsAutenticado = !!localStorage.getItem("usuario");
        
    const id = localStorage.getItem("usuario")
    
    const [med, setMedi] = useState([])

    const FavMedi = async () => {

        try {
            const res = await api.get(`/fav/favmedi/${id}`)
            setMedi(res.data.data)
        }
        catch (error) {
            toast.error(error)
        };
    }

    useEffect(() => {
        FavMedi()
    }, [])

    const [valorDeletado, setvalordeletado] = useState(" ")
    const [loadDeletado, setDeletado] = useState(false)
    const Deletar = async (id) => {
        console.log(id);
        const tabela = "favoritos_medicamentos";
        handlefechar();
        await api.delete(`/fav/favoritodel/${id}/${tabela}`)
            .then((res) => {
                
                if (res.data.data) {

                    FavMedi();
                    setDeletado(true)
                    setTimeout(() => {
                        setDeletado(false)
                    }, 5000)
                    
                }

            }).catch((err) => {
                toast.error(err)
            });
    }
  
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true)
  }

  useEffect(() => {
    handleShow();
  }, [IsAutenticado])

  const handleClose = () => {
    setShow(false)
  }
    const [abrir, setabrir] = useState(false)
    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    return (
        <>
        { IsAutenticado ?
        <>
            <LogActividades tipo={"usuario"} />
            <HeaderUser placeholder={'pesquisar'} disabled={true} />
            <UserSide />
           
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1 style={{ color: 'white' }}>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/map'}>Map</Link></li>
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
                        <Card>
                          
                            <div className="container">
                               <div className="row">
                               <table className="table">
                               <thead>
                                    <tr>
                                        <th>Nome </th>
                                        <th>Preço</th>
                                        <th>tipo</th>
                                        <th>data_validade</th>
                                        <th>Farmacia</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        med.map((medi) => (
                                            <tr key={medi.ide}>
                                                <td>{medi.nome}</td>
                                                <td>{medi.preco} kz</td>
                                                <td>{medi.tipo}</td>
                                                <td>{medi.data_validade}</td>
                                                <td>{medi.nome_farmacia}</td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                                                        <Link to={`/farmacia/${medi.farma}`}>
                                                            <button
                                                                className='btn btn-success' style={{ backgroundColor: '#00968c' }}
                                                            >
                                                                Ver Farmacia
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>

                                                <td>
                                                    <Link className="btn btn-danger btn-sm" onClick={()=> {handleabrir(); setvalordeletado(medi.nome)}} title="Remover medicamentos">
                                                        <i className="bi bi-trash" ></i>

                                                    </Link>
                                                    <Modal show={abrir}>
                                                        <Modal.Header>
                                                            <Modal.Title>Eliminar Medicamentos dos favoritos</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>eliminar {valorDeletado} dos favoritos?</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant='success' onClick={handlefechar}>
                                                                Cancelar
                                                            </Button>
                                                            <Button variant='danger' onClick={() => Deletar(medi.ide)}>
                                                                Eliminar
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                </table>
                                </div>
                               </div>
                        </Card>

                    </div>

                </div>

            </main>

            <FooterDashboard />

        </>
        : 
        <>
        Voce Não está Autenticado! Por favor faça Login 
        <MyModal show={show} handleClose={handleClose} />
        </>
        }
        </>
    )
}