import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Adminperfil from './admin-perfil/admin-perfil'
import Administrador from "./Admintrador/administrador";
import AdminCadastrar from "./Admintrador/AdminCadastrar/adminCadastrar";
import AdminCadastrarFarmacias from "./Admintrador/AdminCadastrarfarmacias/adminCadastrarFarmacias";
import { AdminMostrarFarmacias } from './Admintrador/AdminMostrarFarmacias/AdminMostrarFarmacias';
import { AdminListarUsuario } from './Admintrador/AdminUsuario/adminUsuarioListar';
import { AdminListarGestor } from './Admintrador/AdminMostrarGestor/AdminListarGestor';
import { AdminMensagens } from './Admintrador/AdminMensagens/AdminMensagens';


export const RoutesAdmin = ()=>{

    return(
        <>
            <Routes>
        <Route path="/adminperfil" element={<Adminperfil/>}></Route>
        <Route path="/admin" element={<Administrador />}></Route>
        <Route path="/adminCadastrarGestor" element={<AdminCadastrar/>}></Route>
        <Route path="/adminCadastrarFarmacias" element={<AdminCadastrarFarmacias/>}></Route>
        <Route path='/adminusuario' Component={AdminListarUsuario}></Route>
        <Route path='/adminfarmacias' Component={AdminMostrarFarmacias}></Route>
        <Route path='/adminlistarGestor' Component={AdminListarGestor}></Route>
        <Route path='/adminmensagem' Component={AdminMensagens}></Route>

            </Routes>         
        </>
    )
}