import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Cadastro } from "./pages/cadastro/Cadastro"
import { login } from "./pages/login/login"
import {Home} from './pages/Home/Home'
import { Maps } from "./pages/FarmaciaMaps/Maps"

export const App = ()=> {
   
   return( 
   <>
   <BrowserRouter>
  <Routes>
    <Route path="/Home" exath Component={Home}></Route>
   <Route path="/Cadastro" component={Cadastro}></Route>
   <Route path="/login" component={login}></Route>
   <Route path="/maps" component={Maps}></Route>
   </Routes> 
   </BrowserRouter>
  
    </>
    )
}