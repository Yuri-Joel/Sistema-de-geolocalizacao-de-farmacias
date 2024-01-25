import axios from "axios"
import { useEffect, useState } from "react"
import { ContarSubgestor } from "./components/ContarSubgestor"
import { ContarMedi } from "./components/ContarMedicamentos"
import { ContarfavMedi } from "./components/ContarMedFavoritos"
import FooterDashboard from "../Dashboard/components/footer/footer"
import { HeaderGestor } from "../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../Dashboard/components/aside/gestor/gestorSide"
import { GraficomedFarma } from "./DadosGraficosGestor/GraficofavMedFarma"

export const Gestor = ()=>{

    const [NomeFarma, setNomeFarma] = useState("")
    const [load, setload] = useState(false)
    const id = localStorage.getItem('usuario')

    const NomeId = async()=>{
    try {    
        const res = await axios.get(`http://localhost:8800/ges/nome/${id}`)
        setNomeFarma(res.data.data[0].nome)
        setload(true)


    } catch (error) {
        console.log(error)
    } 

}
useEffect(()=>{
    NomeId()

},[])
        
    return (
        <>
         <HeaderGestor />
        <GestorSide /> 
        {
           ( load && 
            <div>
                {NomeFarma}
                <div>
                 <p>Contar Subgestores</p> 
                 <ContarSubgestor />  
                </div>
                <div>
                 <p>Contar Medicamentos</p>
                 <ContarMedi />  
                </div>
                <div>
                 <p>Contar Numeros de favoritos</p>
                 <ContarfavMedi />  
                </div>

            <GraficomedFarma />

            </div>

            
            )
        }
        <FooterDashboard />
        </>
    )
}