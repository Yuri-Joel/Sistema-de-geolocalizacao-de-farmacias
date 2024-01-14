import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Adminperfil from './admin-perfil/admin-perfil'
import Administrador from "./Admintrador/administrador";
import AdminCadastrar from "./Admintrador/AdminCadastrar/adminCadastrar";
import AdminCadastrarFarmacias from "./Admintrador/AdminCadastrarfarmacias/adminCadastrarFarmacias";


export const RoutesAdmin = ()=>{

    return(
        <>
            <Routes>
        <Route path="/adminperfil" element={<Adminperfil/>}></Route>
        <Route path="/admin" element={<Administrador />}></Route>
        <Route path="/adminCadastrarGestor" element={<AdminCadastrar/>}></Route>
        <Route path="/adminCadastrarFarmacias" element={<AdminCadastrarFarmacias/>}></Route>

            </Routes>         
        </>
    )
}