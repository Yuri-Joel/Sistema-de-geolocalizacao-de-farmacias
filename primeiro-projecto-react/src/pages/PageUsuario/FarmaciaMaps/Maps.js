import React,{ useState, useEffect} from "react";
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api'
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { Logout } from "../../../components/Logout/Logout";
import { Nome } from "../../../components/NomeUser/Nome";

export const Maps = ()=>{

  const Idusuario = localStorage.getItem("usuario")


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
    //
    const handleFavoritar = async(farma)=>{
    
      const med = null;
      const usuario = Idusuario;
    await axios.post("http://localhost:8800/fav/favoritos/",{usuario,med,farma})
     .then(res => {
         if(res.data.status === "Sucess"){
 
             toast.success("Adicionado como favorito")
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
      
       

    return(
        <>
        <div>
           <Link to="/perfil">Meu perfil</Link>  
        </div>
        <Nome />
       <Logout />
       
	{ dataload && (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
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
                            <div>
                                <h2>{selectfarma.nome}</h2>
                                 <button ><Link to={`/farmacia/${selectfarma.id}/${Idusuario}`}>Ver Farmacia</Link></button>
                                <button onClick={()=> handleFavoritar(selectfarma.id)}>Adicionar aos favoritos</button>
                            </div>
                            </InfoWindow>
                    )   }
          
          {directions && <DirectionsRenderer directions={directions} /> }
            </GoogleMap>

)}
          <div>
            <button onClick={()=> handleCriarRota()}>Criar Rota</button>
        </div>
       
        <div>
         <Link to={`/favmed/${Idusuario}`}>Ver Medicamento favoritos</Link>
        </div>
        <div>
         <Link to={`/favfarma/${Idusuario}`}>Ver Farmacias favoritos</Link>
        </div>
        <div>
            <Link to={`/comentar/${Idusuario}`}> Comentarios</Link>
        </div>
     
        </>
    )
}

