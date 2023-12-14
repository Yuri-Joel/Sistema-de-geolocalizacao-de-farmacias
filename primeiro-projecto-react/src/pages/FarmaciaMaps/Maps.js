import React,{ useState, useEffect } from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import axios from "axios";
import { Link } from "react-router-dom";
import { FavoritarFarma } from "../../services/favoritarFarma";


export const Maps = ()=>{
    const [Farmacias , SetFarmacias]=useState([]);
    const [selectfarma, setselectfarma] = useState(null)

    const FarmaciasData = ()=>{
        axios.get(`http://localhost:8800/f/todasfarma`)
        .then(res => SetFarmacias(res.data.data))
        .catch(error=> console.error( error+"erro! ao servidor"))
    }

    useEffect(()=>{
    FarmaciasData()
    },[] )

    const containerStyle = {
        width: '800px',
        height: '600px'
    }
    const center = {
        lat: '-8.8383',
        lng: '13.2344'
    }
    const handleCloseinfoWindow = () =>{
        setselectfarma(null)
    }
    const handleMarkerClick = (farma)=>{
        setselectfarma(farma)

    }

    const handleFavoritar = (id)=>{
       const resposta =  FavoritarFarma(id)

        alert(resposta)

    }

    return(
        <>
        <LoadScript googleMapsApiKey="AIzaSyCDakSjifzNklAYqB0o4zbM2f66mafBoDk"
        region="ao">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                {
                    Farmacias.map((farma)=>(
                        <Marker key={farma.id}
                        position={{lat: farma.latitude, lng: farma.longitude}}
                        title={farma.nome}
                        onClick={()=> handleMarkerClick(farma)}
    
                        />  
                    )) }
                {
                    selectfarma && (
                        <InfoWindow 
                        position={{lat: selectfarma.latitude, lng: selectfarma.longitude}}
                        onCloseClick={handleCloseinfoWindow}>
                            <div>
                                <h2>{selectfarma.nome}</h2>
                                <button ><Link to="/verFarma/">Ver farmacia</Link></button>
                                <button onClick={handleFavoritar(selectfarma.id)}>ver a farmacia</button>
                            </div>

                            </InfoWindow>
                    )   }

            </GoogleMap>
        </LoadScript>
        </>
    )

}