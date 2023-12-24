import React,{ useState, useEffect} from "react";
import {GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

export const Maps = ()=>{
    const [Farmacias , SetFarmacias]=useState([]);
    const [selectfarma, setselectfarma] = useState(null)
    const [dataload,setload] = useState(false)	

    const FarmaciasData = async ()=>{
      try{
 const res = await axios.get("http://localhost:8800/f/todasfarma")
	SetFarmacias(res.data.data)
	setload(true)
console.log(res.data.data)


}catch(error){
console.log(error)
};
       
           
        }
    useEffect(()=>{
FarmaciasData()
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
    const usuario = 10;
    
    const handleFavoritar = async(farma)=>{
      const usuario = 10;
      const med = null;

    await axios.post("http://localhost:8800/fav/favoritos/",{usuario,med,farma})
     .then(res => {
         if(res.data.status === "Sucess"){
 
             toast.success("Adicionado como favorito")
         }
 }).catch(error => console.error( error+"erro! ao servidor"))
      
    }

    console.log(Farmacias)
    return(
        <>
       
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
                {
                    selectfarma && (
                        <InfoWindow 
                        position={{lat: selectfarma.latitude, lng: selectfarma.longitude}}
                        onCloseClick={handleCloseinfoWindow}>
                            <div>
                                <h2>{selectfarma.nome}</h2>
                                 <button ><Link to={`/farmacia/${selectfarma.id}/${usuario}`}>Ver Farmacia</Link></button>
                                <button onClick={()=>handleFavoritar(selectfarma.id)}>Adicionar aos favoritos</button>
                            </div>
                            </InfoWindow>
                    )   }

            </GoogleMap>

)}
          <div>
            <button>Criar Rota</button>
        </div>
       
        <div>
         <Link to={`/favmed/${usuario}`}>Ver Medicamento favoritos</Link>
        </div>
        <div>
         <Link to={`/favfarma/${usuario}`}>Ver Farmacias favoritos</Link>
        </div>
     
        </>
    )
}

