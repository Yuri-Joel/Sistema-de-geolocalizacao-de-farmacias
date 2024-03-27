import React,{useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import {Link}from 'react-router-dom'
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer, usePlacesAutocomplete } from '@react-google-maps/api'
import {toast} from 'react-toastify'
import HeaderUser from '../../Dashboard/components/heder/user/headerUser';
import FooterDashboard from '../../Dashboard/components/footer/footer';
import UserSide from '../../Dashboard/components/aside/user/userSide';
import "./map.css"
import { LogActividades } from '../../Log_Actividades/Log_actividades';
import { api } from '../../api';
import Modal from 'react-bootstrap/Modal'
import { Button, Image, Card } from 'react-bootstrap';


export default function Map() {
  //  
  const Idusuario = localStorage.getItem("usuario")
  const IsAutenticado = !!localStorage.getItem("usuario")

  const [Farmacias , SetFarmacias]=useState([]);
  const [selectfarma, setselectfarma] = useState(null);
  const [dataload,setload] = useState(false);
  const [userLocation, setuserLocation]= useState(null);
  const [directions, setDirections] = useState(null);
 const [Input, setInput] = useState('');
  const [Municipio, setMunicipio]= useState("");
  const [Provincia, setProvincia]= useState('')
  const [load, setloaded] = useState(false);

 
  const FarmaciasData = async ()=>{
          try{
            const res = await api.get(`/f/todasfarma`)
          SetFarmacias(res.data.data)
          setload(true)
          console.log(res.data.data)

      } catch(error){
      console.log(error)
      }
}

  useEffect(()=>{
FarmaciasData();
ObterUserLocation();
  },[])

  const containerStyle = {
      width: '100%',
      height: '37.5rem'
  }
  const center = {
     lat: -8.8373, 
     lng: 13.2344 
  }

  const labelStyle = {
    color: 'white',
    fontWeight: 'bold',
  }
  const handleCloseinfoWindow = () =>{
      setselectfarma(null)
  }
  const handleMarkerClick = (farma)=>{
      setselectfarma(farma)

  }
  
   const handleFavoritar = async(farma)=>{

    if(IsAutenticado){

    const usuario = Idusuario;
      await api.post(`/fav/favoritos-f/`,{usuario,farma})
   .then(res => {
       
       if(res.data.status === "Sucess"){

           toast.success("Adicionado como favorito")
       }
     if(res.data.status === "Favorito já Cadastrado"){
       toast.warn(res.data.status)
     }
}).catch(error => console.error( error+"erro! ao servidor"))
} else {
   toast.error(`Por Favor faça login`)
}
  }

  const ObterUserLocation = ()=>{

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                setuserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                    const lat = position.coords.latitude
                   const  lng = position.coords.longitude
                const geocoder = new window.google.maps.Geocoder();

                geocoder.geocode({location: {lat,lng}}, (result, status)=>{
                  if(status === "OK"){
                    if(result[0]){
                      result[0].address_components.forEach(component => {
                          let Provi= " ";
                          let Muni = " ";
                        if(component.types.includes("locality")){
                          setMunicipio(component.long_name);

                           Muni = component.long_name
                        }
                        if(component.types.includes('administrative_area_level_1')){
                          setProvincia(component.long_name);
                          Provi = component.long_name
                        }

                        localStorage.setItem("local", JSON.stringify({Municipio: Muni, Provincia: Provi}))
                      }) 
                    } else{
                        console.log("Nenhum resultado encontrado!")
                      } 
                  }else {
                    console.log("Geocoder falhou devido a:", status)
                  }
                })
            },(error) => {
              console.error("erro",error.message)
              if (error.code === error.PERMISSION_DENIED ) {
               console.log("Permissão Negada!")
              }              
            }  )    
    } else {
        console.error('Geolocalização não suportada pelo navegador.');
      } }

     const  handleCriarRota = ()=>{
            if (selectfarma && userLocation) {
              const origin = userLocation;
        
              const directionsService = new window.google.maps.DirectionsService();
        
              directionsService.route(
                {
                  origin,
                  destination: { lat: selectfarma.latitude, lng: selectfarma.longitude },
                  travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                  if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                  } else {
                    console.error(`Erro ao obter direções: ${status}`);
                  }
                }
              )
            } else {
            console.log("erro nesta geolocalização");
            ObterUserLocation();
             
            }
      }
    
  //
  const Handledown = (event) => {
    if (event.key === 'Enter') {
        Pesquisar();
        setloaded(false)
    }
  }
  const [dados, setdados] = useState([])
  const [real ,  setdadosReal] = useState([])
 
  const Pesquisar = async(e)=>{
    e.preventDefault()
    setabrir(true)
    setdadosReal([])
   const lat = userLocation.lat
   const lng = userLocation.lng
  console.log(userLocation)
  if(Input.trim()){
   
    try {
      
      const res = await api.post(`/buscarfarma`, {lat, lng, termo: Input, Municipio, Provincia})
        console.log(res.data.data)
        console.log(userLocation)
        setdados(res.data.data)
        setloaded(true) 
        
    } catch (error) {
      throw (error)
    }
  }else{
    console.log("vazio");
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
  const [abrir, setabrir] = useState(false)

  const handlefechar = () => setabrir(false)
  const luandaBounds = {
    north: -8.6,  // Ajustando a latitude para incluir mais da parte superior de Luanda
    south: -9.2,  // Ajustando a latitude para incluir mais da parte inferior de Luanda
    east: 13.6,   // Ajustando a longitude para incluir mais da parte leste de Luanda
    west: 12.8  
  };
  return (
<>

<LogActividades tipo={"usuario"} />
<HeaderUser 
onChange={(e)=>{ handleRealSearch(e.target.value); setInput(e.target.value)} }
 onKeyDown={(e) => Handledown(e)}
 placeholder={'Pesquisar medicamento'}
 value={Input}
 setInput={setInput}
 dados={real}
 onSubmit={Pesquisar} 
 />

<UserSide />

<main id="main" className="main" style={{backgroundColor:'#00968c53'}}>

<div className="pagetitle">
      <h1 style={{color:'white'}}>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/map`}>Map</Link></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    <div className="container">
      <div className="row">
 <div className="card min-vh-40">

            
 { load && ( <>
   { dados ?
  <>
                    <Modal show={abrir} onHide={handlefechar}>
                      <Modal.Header>
                        <Modal.Title>medicamnetos localizados:</Modal.Title>
                      </Modal.Header>
                      <Modal.Body> 
                        {
                          dados.map((med, index) => (
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
                                        <li>{med.data_validade}</li>
                                        <li>{med.informacoes}</li>
                                        <li>{med.nome_farmacia}</li>

                                      </ul>
                                    </div>
                                  </div>
                                  <Image style={{ width: '9rem', height: '9rem' }} className="img-fluid rounded-start " src={`http://localhost:8800/${med.imagem_path}`} alt={med.nome} />

                                  <h5 className="card-title">{med.nome}</h5>
                                  <h5 className="card-title">{med.nome_farmacia}</h5>
                                  <h5 className="card-title"><Link className='btn btn-success' style={{ backgroundColor: '#00968c' }} to={`/farmacia/${med.farmacia_id}`}>Ver Farmacia</Link></h5>

                                  <h6 className="card-subtitle mb-2 text-muted">{med.preco + " kz"}</h6>
                                  <h6><strong>{med.disponibilidade}</strong></h6>
                
                            </Card.Body>
                            </Card>
                            </div>
                          ))
                        }        
                        </Modal.Body>
                      <Modal.Footer>
                        <Button variant='success' onClick={() => setloaded(false)}>
                        Voltar ao Mapa
                        </Button>      
                      </Modal.Footer>
                    </Modal>
                </>
            :
            <>
          </>
}
   </>
   )}

	   { dataload && (
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} options={{ restriction: { latLngBounds: luandaBounds }, 
                strictBounds: true}}>
                {
                    Farmacias.map((farma)=>(
                        <Marker key={farma.id}
                        position={{lat: farma.latitude, lng: farma.longitude}}
                        
                        options={{
                           label: {
                            text: `${farma.nome}`,
                            className: "map-marker",      
                           } }}
                          icon={{
                   url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Ícone verde padrão do Google Maps
                      }}
                        
                        label={{
                          text: 'F',
                          color: labelStyle.color,
                          fontWeight: labelStyle.fontWeight,
                        }}
                       
                        title={farma.nome}
                        onClick={()=> handleMarkerClick(farma)}
                        />  
                  )) }

                {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={{
                              path: window.google.maps.SymbolPath.CIRCLE,
                              fillColor: 'blue',
                              fillOpacity:0.8,
                              strokeWeight:0,
                              scale:10
                            }}
                           
                        />
                        )}
                {
                    selectfarma && (
                        <InfoWindow 
                        position={{lat: selectfarma.latitude, lng: selectfarma.longitude}}
                        onCloseClick={()=> handleCloseinfoWindow()}>
                            <div className='container' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <h2>{selectfarma.nome}</h2>
                                <br />
                              <span>
                                Farmacia {selectfarma.aberto ? `aberta` : `fechada`}
                              </span>
                              <br />
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'0.4rem'}}>
                                <Link to={`/farmacia/ ${selectfarma.id}`}>
                                 <button 
                                 className='btn btn-success'style={{backgroundColor:'#00968c'}}
                                 >
                                  Ver Farmacia
                                  </button>
                                  </Link>
                                <button
                                className='btn btn-success'style={{backgroundColor:'#00968c'}}
                                onClick={()=> handleFavoritar(selectfarma.id)}>Adicionar aos favoritos
                                </button>
                                </div>
                            </div>
                            </InfoWindow>
                    )   }
          {directions && <DirectionsRenderer directions={directions} /> }
            </GoogleMap>
)}    
            <button className='btn btn-success'style={{marginTop:'1rem',backgroundColor:'#00968c'}}  onClick={()=> handleCriarRota()} >Criar Rota</button>
      
   </div> 
        
        </div>
       </div>
    </main>
   <FooterDashboard />
   </>
  )
}
