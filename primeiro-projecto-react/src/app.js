import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Cadastro } from "./pages/cadastro/Cadastro"
import { Login } from "./pages/login/login"
import {Home} from './pages/Home/Home'
import { Maps } from "./pages/FarmaciaMaps/Maps"
import { FarmaciaDetalhes } from "./pages/FarmaciaDetalhes/FarmaciaDetalhes"
import { NotFoundPage } from "./pages/NotFound/NotFound"

export const App = ()=> {
   
   return( 
   <>
   <BrowserRouter>
  <Routes>
   <Route path="/"  exath  Component={Home}></Route>
   <Route path="/cadastro" Component={Cadastro}></Route>
   <Route path="/login" Component={Login}></Route>
   <Route path="/maps" Component={Maps}></Route>
   <Route path="/farmacia/:id" Component={FarmaciaDetalhes}></Route>
   
   {/* Pagina 404 para caminhos não encontrados */}
   <Route Component={NotFoundPage}></Route>
   </Routes> 
   </BrowserRouter>
    </>
    )
}