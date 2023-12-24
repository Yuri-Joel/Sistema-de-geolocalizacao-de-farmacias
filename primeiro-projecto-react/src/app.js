import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Cadastro } from "./pages/PageUsuario/cadastro/Cadastro"
import { Login } from "./pages/login/login"
import {Home} from './pages/Home/Home'
import { Maps } from "./pages/PageUsuario/FarmaciaMaps/Maps"
import { Load } from "./pages/PageUsuario/FarmaciaMaps/LoadScript"
import { FarmaciaDetalhes } from "./pages/PageUsuario/FarmaciaDetalhes/FarmaciaDetalhes"
import { NotFoundPage } from "./pages/NotFound/NotFound";

import {toast , ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { FavoritosMedicamentos } from "./pages/PageUsuario/Verfavoritos/Medicamentos/Medicamentos"
import { FavoritosFarmacia } from "./pages/PageUsuario/Verfavoritos/Farmacias/Farmacias"
import { Recuperar } from "./RecuperarSenha/Recuperar"
import { RedefenirSenha } from "./RecuperarSenha/RedefinirSenha"
import { Comentarios } from "./pages/Comentarios/Comment"

export const App = ()=> {
   
   return( 
   <>
   <BrowserRouter>
   <Load>
  <Routes>
    
   <Route path="/"  exath  Component={Home}></Route>
   <Route path="/cadastro" Component={Cadastro}></Route>
   <Route path="/login" Component={Login}></Route>
   <Route path="/maps" Component={Maps}></Route>
   <Route path="/farmacia/:id/:ad" Component={FarmaciaDetalhes}></Route>
   <Route path="/favmed/:id" Component={FavoritosMedicamentos}></Route>
   <Route path="/favfarma/:id" Component={FavoritosFarmacia}> </Route>
   <Route path="/recuperar" Component={Recuperar}></Route>
   <Route path="/redefinir-senha/:token" Component={RedefenirSenha}></Route>
   <Route path="/comentar/:usuario" Component={Comentarios}></Route>
  
   {/* Pagina 404 para caminhos não encontrados */}
   <Route Component={NotFoundPage}></Route>
   </Routes> 
   </Load>
   </BrowserRouter>
   <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
    )
}