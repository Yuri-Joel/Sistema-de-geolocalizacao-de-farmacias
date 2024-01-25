import {Routes, Route} from 'react-router-dom'
import { Gestor } from './gestor'
import Gestorperfil from './Gestorperfil/GestorPerfil'
import { CadastrarsubGestor } from './CadastrarSubgestor/CadastrarSubgestor'
import { ListarSubGestor } from './ListarSubgestor/ListarSubgestor'
import { CreateProduto } from './Produtos/CRUD/Create'
import { UpdateProduct } from './Produtos/CRUD/Update'
import { ReadProdutos } from './Produtos/CRUD/Read'



export const RoutesGestor = ()=>{

    return (
        <Routes>
            <Route path='/gestor' Component={Gestor}></Route>
            <Route path='/gestorperfil' Component={Gestorperfil}></Route>
            <Route path='/cadastrarsub' Component={CadastrarsubGestor} ></Route>
            <Route path='/listarsubgestor' Component={ListarSubGestor}></Route>
            <Route path='/cadastrarprodutos' Component={CreateProduto}></Route>
            <Route path='/editarproduto/:id' Component={UpdateProduct}></Route>
            <Route path='/listarprodutos' Component={ReadProdutos}></Route>
        </Routes>
    )
}