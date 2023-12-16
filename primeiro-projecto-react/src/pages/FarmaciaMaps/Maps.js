import React,{ useState, useEffect } from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer} from '@react-google-maps/api'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { FavoritarFarma } from "../../services/favoritar";
import { FarmaciasData } from "../../services/FarmaciaDetals";
import { Verificar } from "../../services/Verificar";


export const Maps = ()=>{
    const navigate = useNavigate()

    const [Farmacias , SetFarmacias]=useState([]);
    const [selectfarma, setselectfarma] = useState(null)
    const[userLocation, setuserLocation]= useState(null)
    const [directions, setDirections] = useState(null);
    const[Autenticar, setAutenticar] = useState(null)

    AutenticarUsuario();
   const AutenticarUsuario = async()=>{
    const resposta = await Verificar()
    setAutenticar(resposta)
   }  

  const TodasFarmacias =async()=>{
    const resposta = await FarmaciasData()
    SetFarmacias(resposta);
  }

    useEffect(()=>{
    TodasFarmacias();
    ObterUserLocation()
    },[] )

    const containerStyle = {
        width: '800px',
        height: '600px'
    }
    const center = {
        lat: -8.8383,
        lng: 13.2344
    }
    const handleCloseinfoWindow = () =>{
        setselectfarma(null)
    }
    const handleMarkerClick = (farma)=>{
        setselectfarma(farma)

    }
    const handleVer =(id)=>{
       
       navigate(`/farmacia/${id}`)
    }

    const handleFavoritar = async(FarmaciaId)=>{
      const UsuarioId = Autenticar.nome
       const resposta = await FavoritarFarma(FarmaciaId, UsuarioId)
       console.log(resposta)
        alert(resposta)
    }
   const ObterUserLocation =()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
          position =>{
              setuserLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.latitude,
              });
          },(error) => console.error("erro",error.message)
      )
  } else {
      console.error('Geolocalização não suportada pelo navegador.');
    }
  
   }
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
            );
          } 
    }
    
    return(
        <>
        {
          Autenticar.auth ?
           <div>
        <LoadScript googleMapsApiKey="AIzaSyCDakSjifzNklAYqB0o4zbM2f66mafBoDk"
        region="ao">
            <GoogleMap mapContainerStyle={containerStyle} center={userLocation || center} zoom={12}>
                {
                    Farmacias.map((farma)=>(
                        <Marker key={farma.id}
                        position={{lat: farma.latitude, lng: farma.longitude}}
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
                            fillOpacity: 0.8,
                            strokeWeight: 0,
                            scale: 10,
                            }}
                        />
                        )}
                {
                    selectfarma && (
                        <InfoWindow 
                        position={{lat: selectfarma.latitude, lng: selectfarma.longitude}}
                        onCloseClick={()=> handleCloseinfoWindow}>
                            <div>
                                <h2>{selectfarma.nome}</h2>
                                <button onClick={()=> handleVer(selectfarma.id)}>Ver Farmacia</button>
                                <button onClick={()=>handleFavoritar(selectfarma.id)}>Adicionar aos favoritos</button>
                            </div>
                            </InfoWindow>
                    )   
                    }
                  
                  { selectfarma && (
          <DirectionsService
            options={{
              destination: { lat: selectfarma.latitude, lng: selectfarma.longitude },
              origin: userLocation,
              travelMode: window.google.maps.TravelMode.DRIVING,
            }}
            callback={(result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`Erro ao obter direções: ${status}`);
              }
            }}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
        <div>
            <button onClick={()=> handleCriarRota}>Criar Rota</button>
        </div>
        </div>
        :
        <div>
         <div>ERRO usuario não autenticado</div>
        <Link to="/login">Login</Link>
        </div>
        }
        </>
    )

}
