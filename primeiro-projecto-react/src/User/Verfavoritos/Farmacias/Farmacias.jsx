import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderUser from '../../../Dashboard/components/heder/user/headerUser'
import UserSide from '../../../Dashboard/components/aside/user/userSide'
import { Nome } from "../../../components/NomeUser/Nome";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import FooterDashboard from "../../../Dashboard/components/footer/footer";
import { Card } from "react-bootstrap";
import { LogActividades } from "../../../Log_Actividades/Log_actividades";
import { MyModal } from "../../component/Modal";
import { api } from "../../../api";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'


export const FavoritosFarmacia = () => {

  const id = localStorage.getItem("usuario")

  const IsAutenticado = !!localStorage.getItem("usuario")
  const [Farma, setfarma] = useState([]);
  const Favfarma = async () => {
    try {
      const res = await api.get(`/fav/favoritos/${id}`)
      setfarma(res.data.data)
    }
    catch (err) {
      toast.error(err)
    };
  }

  useEffect(() => {
    Favfarma();
  }, [])

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
  const [valorDeletado, setvalordeletado] = useState(" ")
  const [loadDeletado, setDeletado]= useState(false)
  const Delete = async (id) => {
    
    handlefechar();
    const tabela = "favoritos_farmacia"
    await api.delete(`/fav/favoritodel/${id}/${tabela}`)
      .then((res) => {

       
        if (res.data.data) {
          
          Favfarma();
          setDeletado(true)
          setTimeout(() => {
            setDeletado(false)
          }, 5000)
        }

       
      }).catch((err) => {
        toast.error(err)
      });
  }
  const [abrir, setabrir] = useState(false)
  const handlefechar = () => setabrir(false)
  const handleabrir = () => setabrir(true)
  return (
    <>
      <LogActividades tipo={"usuario"} />
      {
        IsAutenticado ?
          <>
            <HeaderUser nome={<Nome />} placeholder={'pesquisar....'} disabled={true} />
            <UserSide />

            <main id="main" className="main" style={{ backgroundColor: '#00968c53' }} >
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
               {   (loadDeletado &&
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
                              <th>endereço</th>
                              <th>telefone</th>
                              <th>NIF</th>
                              <th>Ver</th>
                              <th>Eliminar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              Farma.map((farmacia) => (
                                <tr key={farmacia.ide}>
                                  <td>{farmacia.nome}</td>
                                  <td>{farmacia.endereco}</td>
                                  <td>{farmacia.telefone}</td>
                                  <td>{farmacia.nif}</td>
                                  <Modal show={abrir}>
                                    <Modal.Header>
                                      <Modal.Title>Eliminar Farmacia dos favoritos</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>eliminar {valorDeletado} dos favoritos?</Modal.Body>
                                    <Modal.Footer>
                                      <Button variant='success' onClick={handlefechar}>
                                        Cancelar
                                      </Button>
                                      <Button variant='danger' onClick={() => Delete(farmacia.ide)}>
                                        Eliminar
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                  <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                                      <Link to={`/farmacia/${farmacia.id}`}>
                                        <button
                                          className='btn btn-success' style={{ backgroundColor: '#00968c' }}
                                        >
                                          Ver Farmacia
                                        </button>
                                      </Link>
                                    </div>
                                  </td>

                                  <td>
                                    <Link className="btn btn-danger btn-sm" title="Apagar" onClick={() => { handleabrir(); setvalordeletado(farmacia.nome) }}>
                                      <i className="bi bi-trash" ></i>
                                    </Link>

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