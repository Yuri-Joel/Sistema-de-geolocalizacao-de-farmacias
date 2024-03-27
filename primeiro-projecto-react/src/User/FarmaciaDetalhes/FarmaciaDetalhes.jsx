import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Image, Card } from 'react-bootstrap';
import UserSide from '../../Dashboard/components/aside/user/userSide';
import HeaderUser from '../../Dashboard/components/heder/user/headerUser';
import imagenscards from '../../assets/Geo Farma/j.jpg'
import { LogActividades } from '../../Log_Actividades/Log_actividades';
import { MyModal } from '../component/Modal';
import { api } from '../../api';


export const FarmaciaDetalhes = () => {

  const { id } = useParams()
  const IdUsuario = localStorage.getItem("usuario")
  const [Medi, setMedi] = useState([])
  const [bool, setbool] = useState(false)
  const [Comp, setComparar] = useState(false)
  const [Pesqui, setPesquisar] = useState(false)
  const [Input, setInput] = useState('');

  const [NomeFarmacia, SetNomeFarmacia] = useState("")
  const [Emailfarma, setEmail]= useState(" ")
  const [open , setopen] = useState(null)
  const [show, setShow] = useState(false);
  const [real ,  setdadosReal] = useState([])
  const IsAutenticado = !!localStorage.getItem("usuario")
 //const local = localStorage.getItem("local")

const dados = {
  Municipio: "Kilamba Kiaxi",
  Provincia: "Luanda"
}//JSON.parse(local)

  const handledetalhes = async (id) => {
    const usuario = IdUsuario;
    try {
      const res = await api.get(`/m/med/${id}/${usuario}`)
      setMedi(res.data.data)
      SetNomeFarmacia(res.data.data[0].farmacia_nome)
      setEmail(res.data.data[0].email)
      setopen(res.data.data[0].aberto)

      setbool(true)
      setPesquisar(false);
      setComparar(false);
    }
    catch (erro) {
      throw new Error(erro)
    }
  }

  useEffect(() => {
    handledetalhes(id);
  }, [])

  const Comparar = async (med) => {

    try {
      const res = await api.get(`/m/compara/${med}`)
      console.log(res.data.data);
      setMedi(res.data.data)
      setbool(false);
      setPesquisar(false);
      setComparar(true);
    }
    catch (error) {
     throw new Error(error)
    }
  }

 const [alert, setAlert] = useState(false)
  const Pesquisar = async (e) => {
    e.preventDefault()
   
    if(Input.trim()){

      dados.usuario = IdUsuario;
      dados.idfarma = id;
      dados.search = Input.trim()
    try {
      const res = await api.post(`/b/buscar`, dados)
    
      if (res.data.data) {
        setMedi(res.data.data)
        setdadosReal([])
        setPesquisar(true)
        setbool(false)
        setComparar(false)
      } 
     const  a = res.data.data.length == 0
      console.log(a);
      setAlert(a)
      console.log(alert);
      
     
    } catch (erro) { 
      console.error(erro) 
    }} else{
      console.log("vazio")
    }

  }

  const handleShow =()=>{
    setShow(true)
  }
  const handleClose = ()=>{
    setShow(false)
  }
  const Handledown = (event) => {
    if (event.key === 'Enter') {
        Pesquisar();
    }
  }

  const [idFarma,setIdFarma ]= useState(0)
  const handleFavoritar = async (medicamentoId) => {
    // Lógica para adicionar / remover medicamento dos favoritos
    console.log(medicamentoId);
    let farma
    let med; 
    let usuario
    if(IsAutenticado){
      if(idFarma){
        farma= idFarma
        med = medicamentoId;
        usuario = IdUsuario;
      } else{
     med = medicamentoId;
     usuario = IdUsuario;
    farma = id;}
    try {
      const res = await api.post("/fav/favoritos-m/", { usuario, med, farma })
      console.log(res.data.status);

      setMedi((prevMedicamentos) =>
        prevMedicamentos.map((medicamento) =>
          medicamento.id === medicamentoId
            ? { ...medicamento, favorito_id: !medicamento.favorito_id }
            : medicamento
        ))

    } catch (error) { 
      throw new Error('Erro ao favoritar medicamento:', error);
    }

  } else{
    handleShow()
  }
  }
  
  const handleRealSearch = async(termo)=>{
  
    try {
      const res = await api.post(`/realtime`, { termo})
        console.log(res.data.data)
        setdadosReal(res.data.data)
    } catch (error) {
      throw (error)
    }

  }
 

  return (
    <>
      
          <LogActividades tipo={"usuario"} />
                <HeaderUser
              onChange={e =>{ handleRealSearch(e.target.value); setInput(e.target.value)}}
              onKeyDown={(e) => Handledown(e)}
              placeholder={'Pesquisar medicamento'}
              value={Input}
              onSubmit={Pesquisar}
              setInput={setInput}
              dados={real}

              />
              
            <UserSide />
  
            {
              bool && (
                <main id="main" className="main" >
                  <section className='section'>
                    <div className="container">
                      <div className="row">
                 
                        <div className="col-md-12">
                          <Card style={{ height: '100vh' }}>
                            <h1>Lista de Medicamentos da {NomeFarmacia}</h1>
                            <h2>Farmacia {open ? "Aberta" : "Fechada"}</h2>
                            <h4>Email: {Emailfarma}</h4>
                           
                            <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                              {Medi.map((medicine, index) => (
                                <div className="col-md-4" key={index}>
                                  <Card style={{borderRadius: '1rem' }}>
                                    <Card.Body>
                                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="filter">
                                          <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                              <h6>Detalhes</h6>
                                            </li>
                                            <li>{medicine.data_validade}</li>
                                            <li>{medicine.informacoes}</li>
                                          </ul>
                                        </div>

                                        {/* &#9829; */} <i
                                          onClick={() => handleFavoritar(medicine.id)}
                                          style={{ color: medicine.favorito_id ? 'red' : 'gray', width: '2rem', height: '2rem',cursor:'pointer' }}
                                          className='bi bi-heart-fill'>

                                        </i>

                                      </div>
                                      <Image style={{ width: '9rem', height: '9rem' }} className="img-fluid rounded-start " src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.nome} />


                                      <h5 className="card-title">{medicine.nome}</h5>
                                      <h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
                                      <h6><strong >{medicine.disponibilidade}</strong></h6>
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

              <main id="main" className="main" >
                <section className='section'>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <Card style={{ height: '100vh' }}>
                          <h1>Lista de Medicamentos da {NomeFarmacia}</h1>
                          <h2>Farmacia {open ? "Aberta" : "Fechada"}</h2>
                          <h4>Email: {Emailfarma}</h4>
                          <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                            {Medi.map((medicine, index) => (
                              <div className="col-md-4" key={index}>
                                <Card style={{borderRadius: '1rem' }}>
                                  <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                      <div className="filter">
                                        <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                          <li className="dropdown-header text-start">
                                            <h6>Detalhes</h6>
                                          </li>
                                          <li>{medicine.data_validade}</li>
                                          <li>{medicine.informacoes}</li>
                                          <li>{medicine.nome_farmacia}</li>
                                        
                                        </ul>
                                      </div>

                                      {/* &#9829; */} 
                                     {/*  <i
                                        onClick={() => handleFavoritar(medicine.id_med)}
                                        style={{ color: medicine.favorito_id ? 'red' : 'gray', width: '2rem', height: '2rem' }}
                                        className='bi bi-heart-fill'>

                                      </i> */}

                                    </div>
                                    <Image style={{ width: '9rem', height: '9rem' }} className="img-fluid rounded-start " src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.name} />


                                    <h5 className="card-title">{medicine.nome_medicamento}</h5>
                                    <h5 className="card-title">{medicine.nome_farmacia}</h5>
                                    <h5 className="card-title"><button className='btn btn-success' style={{ backgroundColor: '#00968c' }} onClick={() => { setIdFarma(medicine.id_farma) ; handledetalhes(medicine.id_farma)}}>Ver Farmacia</button></h5>

                                    <h6 className="card-subtitle mb-2 text-muted">{medicine.preco + " kz"}</h6>
                                    <h6><strong>{medicine.disponibilidade}</strong></h6>
                                    {/* 
                                    <Button variant="success" onClick={() => Comparar(medicine.nome)} className="mr-2">
                                      Comparar preço
                                    </Button>
                                  */}
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


            {Pesqui && (

              <main id="main" className="main" >
                <section className='section'>
                  <div className="container">
                    <div className="row">
                {alert && (
                  <div className='alert alert-danger'>
                    Nesta farmacia não contém este produto!
                    procure em outra farmacia. Geo Farma
                  </div>)}
                      <div className="col-md-12">
                        <Card style={{ height: '100vh' }}>
                          <h1>Lista de Medicamentos da {NomeFarmacia}</h1>
                          <h2>Farmacia {open ? "Aberta" : "Fechada"}</h2>
                          <h4>Email: {Emailfarma}</h4>
                          <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                            {Medi.map((medicine, index) => (
                              <div className="col-md-4" key={index}>
                                <Card style={{ backgroundColor: "white", borderRadius: '1rem' }}>
                                  <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                      <div className="filter">
                                        <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                          <li className="dropdown-header text-start">
                                            <h6>Detalhes</h6>
                                          </li>
                                          <li>{medicine.data_validade}</li>
                                        </ul>
                                      </div>

                                      {/* &#9829; */} <i
                                        onClick={() => handleFavoritar(medicine.id)}
                                        style={{ color: medicine.favorito_id ? 'red' : 'gray', width: '2rem', height: '2rem' }}
                                        className='bi bi-heart-fill'>

                                      </i>

                                    </div>
                                    <Image style={{ width: '9rem', height: '9rem' }} className="img-fluid rounded-start " src={`http://localhost:8800/${medicine.imagem_path}`} alt={medicine.nome} />


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
  

  <MyModal show={show} handleClose={handleClose} />
</>
            
          


  )  }