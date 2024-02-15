import React,{useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import {Link}from 'react-router-dom'
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api'
import axios from "axios";
import {toast} from 'react-toastify'
import { Nome } from "../../components/NomeUser/Nome";
import HeaderUser from '../../Dashboard/components/heder/user/headerUser';
import FooterDashboard from '../../Dashboard/components/footer/footer';
import UserSide from '../../Dashboard/components/aside/user/userSide';
import "./map.css"
import { LogActividades } from '../../Log_Actividades/Log_actividades';

export default function Map() {
  //  
  const Idusuario = localStorage.getItem("usuario")
  const IsAutenticado = !!localStorage.getItem("usuario")

  const [Farmacias , SetFarmacias]=useState([]);
  const [selectfarma, setselectfarma] = useState(null);
  const [dataload,setload] = useState(false);
  const [userLocation, setuserLocation]= useState(null);
  const [directions, setDirections] = useState(null);

  const FarmaciasData = async ()=>{
          try{
      const res = await axios.get("http://localhost:8800/f/todasfarma")
          SetFarmacias(res.data.data)
          setload(true)
         

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
      lat: -8.8383,
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
  //
  const handleFavoritar = async(farma)=>{
  
    const usuario = Idusuario;
  await axios.post("http://localhost:8800/fav/favoritos-f/",{usuario,farma})
   .then(res => {
       
       if(res.data.status === "Sucess"){

           toast.success("Adicionado como favorito")
       }
     if(res.data.status === "Favorito já Cadastrado"){
       toast.warn(res.data.status)
     }
}).catch(error => console.error( error+"erro! ao servidor"))
    
  }

  const ObterUserLocation = ()=>{

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                setuserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                
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
    
  return (
<>
{ IsAutenticado ?
 <>
          <LogActividades tipo={"usuario"} />
<HeaderUser nome={<Nome />} placeholder={'Pesquisar Farmacia....'}/>

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

           
 <div className="card info-card sales-card   min-vh-40" style={{height:'30rem'}}>
      
	    { dataload && (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                {
                    Farmacias.map((farma)=>(
                        <Marker key={farma.id}
                        position={{lat: farma.latitude, lng: farma.longitude}}
                        
                        options={{
                           label: {
                            text: `${farma.nome}`,
                            className: "map-marker",      
                          },
                           // icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        }}
                          icon={{
                   url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
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
                                <Link to={`/farmacia/${selectfarma.id}/${Idusuario}`}>
                                 <button  className='btn btn-success'style={{backgroundColor:'#00968c'}}>
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
   : <div>ERRO! voce Não está Autenticado</div> }
    </>
  )
}
