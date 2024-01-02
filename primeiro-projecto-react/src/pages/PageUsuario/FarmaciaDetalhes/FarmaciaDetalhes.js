import React,{  useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Logout } from '../../../components/Logout/Logout';
import { Nome } from '../../../components/NomeUser/Nome';


export const FarmaciaDetalhes = ()=>{

const {id} = useParams()
const {ad} = useParams()
const [Medi, setMedi] = useState([])
const[bool, setbool] = useState(false)
const [Input, setInput]= useState('')



const handledetalhes = async ()=>{
  try{
    const res = await axios.get(`http://localhost:8800/m/med/${id}`)
    setMedi(res.data.data)
    setbool(true)
  }
    catch(erro){ 
      console.error(erro)
    }
}

useEffect(()=>{
  handledetalhes()
},[])

const favoritarMedi =async( med)=>{
  const usuario = ad;
  const farma = id;
  await axios.post("http://localhost:8800/fav/favoritos/", {usuario, med, farma})
  .then(res => {
      if(res.data.status === "Sucess"){

          toast.success("Medicamento Adicionado como favorito")
          
      }
  })
  .catch(error =>console.error( error))
}

const Comparar = async(med)=>{

  try{
    const res = await axios.get(`http://localhost:8800/m/compara/${med}`)
    setMedi(res.data.data)
    setbool(true);    
  }
  catch(error ){
    console.error( error)
  } 
}

const Pesquisar = async(e)=>{
  e.preventDefault()
  const search = Input;
  try{
    const res = await  axios.get(`http://localhost:8800/b/buscar/${search}`)
    console.log(res.data)
    if(res.data.data){
    setMedi(res.data.data)   
    setbool(true)
  }
   }catch(erro){ console.error(erro)}

}

const Handledown =(event)=>{
  if(event.key === 'Enter'){
      Pesquisar();
  }
}


    return(
        <>
        <div>
           <div>
           <Link to="/perfil">Meu perfil</Link>  
          </div>
          <Nome />
          <Logout />
          <form onSubmit={Pesquisar}>
          <input placeholder='Pesquise o nome de um medicamneto' onKeyDown={(e)=> Handledown(e)} value={Input}  onChange={e => setInput(e.target.value)}  />
          <button type='submit'> Pesquisar</button>
          </form>
        </div>
        <div>
         <Link to={`/favmed/${ad}`}>Ver Medicamento favoritos</Link>
        </div>
        <div>
         <Link to={`/favfarma/${ad}`}>Ver Farmacias favoritos</Link>
        </div>
        <div>
            <Link to={`/comentar/${ad}`}> Comentarios</Link>
        </div>
        {
         bool ?
            
            <div>  
                {
            Medi.map((med)=>(
                <div key={med.id}>
                  <h2> {med.nome}</h2> 
                  <p> { med.tipo} </p>
                  <p> { med.informacoes} </p>
                  <h2>{med.preco +" kz"}</h2>
                  <div>
                    <img src={med.imagem_path} alt='descricao de um medicamento' />
                  </div>
                  <p> {med.data_validade} </p>
                  <p> {med.disponibilidade} </p>
                  <button onClick={()=> favoritarMedi(med.id)}>Favoritar</button>
                  <button onClick={()=> Comparar(med.nome)}>Comparar</button>
                </div>
            ))     
        }
        </div>
            
             :
             <div> erro no servidor</div>
             
        }
       
        </>
    )
}
