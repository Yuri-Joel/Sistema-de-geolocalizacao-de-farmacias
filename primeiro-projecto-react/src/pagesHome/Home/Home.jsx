import { Link } from "react-router-dom"
import { ContarUser } from "../Components/Contagem"
import { CountFarmacias } from "../Components/Contagem"

export const Home = ()=>{

    return(
        <>
        
         <Link to="/login">iniciar Sessao</Link>
       
         <div><ContarUser /> : Usuarios</div>
        <div><CountFarmacias /> :Farmacias</div>

        <div><Link to="/map"></Link></div>
        </>  
    )
}