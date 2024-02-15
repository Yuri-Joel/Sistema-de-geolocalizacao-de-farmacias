import React from "react";
import {Route, Routes}from 'react-router-dom'
import User from "./usuario-perfil/users-profile";
import Login from "../pagesHome/Login/login";
import Cadastrar from "./Cadastrar/cadastrar";
import Map from './Map/map';
import {Recuperar} from './RecuperarSenha/VerificarEmail'
import { RedefenirSenha } from "./RecuperarSenha/VerificarToken";
import { AddNovaSenha } from "./RecuperarSenha/AddNovaSenha";
import { FarmaciaDetalhes} from './FarmaciaDetalhes/FarmaciaDetalhes'
import { FavoritosMedicamentos } from "./Verfavoritos/Medicamentos/Medicamentos";
import {FavoritosFarmacia } from "./Verfavoritos/Farmacias/Farmacias"
import {Comentarios} from "./Comentarios/Comment"
import {Home} from '../pagesHome/Home/Home'
import { ConfirmCadastro } from "./Cadastrar/ConfirmarCadastro/Confirmcadastro";
import { ObterLogUser } from "./UserLogActividades/UserLog";


export default function RoutesDashboard (){
    return (
      <>
               <Routes> 
                <Route  path="/" exact Component={Home}></Route>
                <Route path="/map" element={<Map />} ></Route>
                <Route path="/confirmcadastro" Component={ConfirmCadastro}></Route>
              
                <Route path="/users-profile" element={<User />}></Route>
               
                <Route path="/login" element={<Login />}></Route>
                <Route path="/cadastrar" element={<Cadastrar />}></Route>
               
                <Route  path="/recuperar" Component={Recuperar}></Route>
                <Route  path="/redefinir-senha" Component={RedefenirSenha}></Route>
                <Route  path="/addnovasenha/:id" Component={AddNovaSenha}></Route>

                <Route  path="/farmacia/:id/:ad" Component={FarmaciaDetalhes}></Route>
                <Route  path="/favmed/:id" Component={FavoritosMedicamentos}></Route>
                <Route  path="/favfarma/:id" Component={FavoritosFarmacia}> </Route>
                <Route  path="/comentar/:usuario" Component={Comentarios}></Route>
                <Route path="/userlog" Component={ObterLogUser}></Route>
             </Routes>  
      </>
    )
  
}

