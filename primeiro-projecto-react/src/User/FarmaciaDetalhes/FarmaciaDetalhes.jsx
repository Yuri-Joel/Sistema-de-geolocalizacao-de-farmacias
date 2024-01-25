import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import UserSide from '../../Dashboard/components/aside/user/userSide';
import { LogActividades } from '../../Log_Actividades/Log_actividades';
import HeaderUser from '../../Dashboard/components/heder/user/headerUser';
import imagenscards from '../../assets/Geo Farma/j.jpg'
import { Nome } from '../../components/NomeUser/Nome';



export const FarmaciaDetalhes = () => {

  const { id } = useParams()
  const { ad } = useParams()
  const [Medi, setMedi] = useState([])
  const [bool, setbool] = useState(false)
  const [Comp, setComparar] = useState(false)
  const [Pesqui, setPesquisar] = useState(false)
  const [Input, setInput] = useState('');

  const IsAutenticado = !!localStorage.getItem("usuario")



  const handledetalhes = async () => {
    const usuario = ad;
    try {
      const res = await axios.get(`http://localhost:8800/m/med/${id}/${usuario}`)
      setMedi(res.data.data)
      setbool(true)
    }
    catch (erro) {
      console.error(erro)
    }
  }

  useEffect(() => {
    handledetalhes()
  }, [])



  const Comparar = async (med) => {

    try {
      const res = await axios.get(`http://localhost:8800/m/compara/${med}`)
      setMedi(res.data.data)
      setbool(false);
      setPesquisar(false)
      setComparar(true)
    }
    catch (error) {
      console.error(error)
    }
  }

  const Pesquisar = async (e) => {
    e.preventDefault()
    const search = Input;
    const usuario = ad;
    const idfarma = id
    try {
      const res = await axios.get(`http://localhost:8800/b/buscar/${search}/${usuario}/${idfarma}`)
      console.log(res.data)
      if (res.data.data) {
        setMedi(res.data.data)
        setPesquisar(true)
        setbool(false)
        setComparar(false)
      }
    } catch (erro) { console.error(erro) }

  }


  const Handledown = (event) => {
    if (event.key === 'Enter') {
      Pesquisar();
    }
  }

  const handleFavoritar = async (medicamentoId) => {
    // Lógica para adicionar/remover medicamento dos favoritos

    const med = medicamentoId;
    const usuario = ad;
    const farma = id;
    try {
      const res = await axios.post("http://localhost:8800/fav/favoritos-m/", { usuario, med, farma })
      console.log(res.data.status);

      setMedi((prevMedicamentos) =>
        prevMedicamentos.map((medicamento) =>
          medicamento.id === medicamentoId
            ? { ...medicamento, favorito_id: !medicamento.favorito_id }
            : medicamento
        )

      )

    } catch (error) {
      console.error('Erro ao favoritar medicamento:', error);
    }

  }

  return (
    <>
      
      {
        IsAutenticado ?
          <>
              <HeaderUser 
              onChange={e => setInput(e.target.value)}
               onKeyDown={(e) => Handledown(e)}
                placeholder={'Pesquisar medicamento'} 
                value={Input}
                onSubmit={Pesquisar}
                nome={<Nome />}
                />
            <UserSide />
            <LogActividades />

            {
              bool && (
                <main id="main" className="main" >
                  <section className='section'>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <Card style={{ height: '100vh' }}>
                        <h1>Lista de Medicamentos</h1>
                        <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                          {Medi.map((medicine, index) => (
                            <div className="col-md-4" key={index}>
                              <Card style={{ backgroundColor: "white", borderRadius: '1rem' }}>
                                <Card.Body>
                                 <div style={{display:'flex',justifyContent:'space-between'}}> 
                                <div className="filter">
                                    <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                      <li className="dropdown-header text-start">
                                        <h6>Detalhes</h6>
                                      </li>
                                      <li>{medicine.data_validade}</li>
                                    </ul>
                                  </div>

                                    {/* &#9829; */} <i 
                                     onClick={() => handleFavoritar(medicine.id)}
                                    style={{ color: medicine.favorito_id ? 'red' : 'gray',width:'2rem',height:'2rem' }} 
                                    className='bi bi-heart-fill'>

                                    </i>
                               
                                  </div>
                                  <Image style={{width:'9rem',height:'9rem'}} className="img-fluid rounded-start "src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.name} />
                                 
                                
                                  <h5 className="card-title">{medicine.nome}</h5>
                                  <h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
                                  <h6><strong>{medicine.disponibilidade}</strong></h6>
                                  <h6><strong>{medicine.data_validade}</strong></h6>
                                  <Button variant="success" onClick={() => Comparar(medicine.nome)} className="mr-2">
                                    Comparar preço
                                  </Button>
                                 
                                </Card.Body>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
                </section>
                </main>
              )
            }

            {Comp && (

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Card style={{ height: '100vh' }}>
                      <h1>Lista de Medicamentos</h1>
                      <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                        {Medi.map((medicine, index) => (
                          <div className="col-md-4" key={index}>
                            <Card style={{ backgroundColor: "white", borderRadius: '1rem' }}>
                              <Card.Body>
                                <Image className="img-fluid rounded-start" style={{ width: 100 + '%', height: 8 + 'rem' }} src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.name} />
                                <button className='btn '
                                  onClick={() => handleFavoritar(medicine.id_med)}
                                  style={{ color: medicine.favorito_id ? 'red' : 'gray' }}
                                >
                                  &#9829;
                                </button>
                                <h5 className="card-title">{medicine.nome_medicamento}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
                                <Button variant="primary" onClick={() => Comparar(medicine.nome_medicamento)} className="mr-2">
                                  Comparar preço
                                </Button>
                                <div className="filter">
                                  <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                      <h6>Detalhes</h6>
                                    </li>
                                    <li>{medicine.preco}</li>
                                    <li>{medicine.nome_farmacia}</li>
                                    <li>{medicine.data_validade}</li>
                                    <li>{medicine.disponibilidade}</li>
                                  </ul>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )
            }

            
            {Pesqui && (

              <main id="main" className="main" >
                  <section className='section'>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <Card style={{ height: '100vh' }}>
                        <h1>Lista de Medicamentos</h1>
                        <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                          {Medi.map((medicine, index) => (
                            <div className="col-md-4" key={index}>
                              <Card style={{ backgroundColor: "white", borderRadius: '1rem' }}>
                                <Card.Body>
                                 <div style={{display:'flex',justifyContent:'space-between'}}> 
                                <div className="filter">
                                    <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                      <li className="dropdown-header text-start">
                                        <h6>Detalhes</h6>
                                      </li>
                                      <li>{medicine.data_validade}</li>
                                    </ul>
                                  </div>

                                    {/* &#9829; */} <i 
                                     onClick={() => handleFavoritar(medicine.id)}
                                    style={{ color: medicine.favorito_id ? 'red' : 'gray',width:'2rem',height:'2rem' }} 
                                    className='bi bi-heart-fill'>

                                    </i>
                               
                                  </div>
                                  <Image style={{width:'9rem',height:'9rem'}} className="img-fluid rounded-start "src={imagenscards} alt={medicine.name} />
                                 
                                
                                  <h5 className="card-title">{medicine.nome}</h5>
                                  <h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
                                  <h6><strong>{medicine.disponibilidade}</strong></h6>
                                  <Button variant="success" onClick={() => Comparar(medicine.nome)} className="mr-2">
                                    Comparar preço
                                  </Button>
                                 
                                </Card.Body>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
                </section>
                </main>

            )
            }

          </>
          :
          <>
            Voce não esta Autenticado
          </>
          
      }
    </>
  )
}
