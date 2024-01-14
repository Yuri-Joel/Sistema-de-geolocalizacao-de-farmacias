import React,{  useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';



export const FarmaciaDetalhes = ()=>{

const {id} = useParams()
const {ad} = useParams()
const [Medi, setMedi] = useState([])
const[bool, setbool] = useState(false)
const [Input, setInput]= useState('');

const IsAutenticado = !!localStorage.getItem("usuario")



const handledetalhes = async ()=>{
  const usuario = ad;
  try{
    const res = await axios.get(`http://localhost:8800/m/med/${id}/${usuario}`)
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

const handleFavoritar = async(medicamentoId) => {
  // Lógica para adicionar/remover medicamento dos favoritos

  const med = medicamentoId;
  const usuario = ad;
  const farma = id;
  try {
    const res = await axios.post("http://localhost:8800/fav/favoritos-m/", {usuario, med, farma})
        console.log(res.data.status);

        setMedi((prevMedicamentos) =>
        prevMedicamentos.map((medicamento)=>
        medicamento.id === medicamentoId
        ?{...medicamento, favorito_id: !medicamento.favorito_id}
        : medicamento
        )
        
        )
       
  } catch (error) {
    console.error('Erro ao favoritar medicamento:', error);
  }
 
       }

    return(
        <>
        {
          IsAutenticado ?
          <>
        <div>
           
          <form onSubmit={Pesquisar}>
          <input placeholder='Pesquise o nome de um medicamneto' onKeyDown={(e)=> Handledown(e)} value={Input}  onChange={e => setInput(e.target.value)}  />
          <button type='submit'> Pesquisar</button>
          </form>
        </div>
        {
         bool ?
            
            <div >  
                {
            Medi.map((medicamento)=>(
                <div key={medicamento.id}>
                  <h2> {medicamento.nome}</h2> 
              <h2>{medicamento.preco +" kz"}</h2>
                  <div>
                    <img src={medicamento.imagem_path} alt='descricao de um medicamento' />
                  </div>
                  <p> {medicamento.data_validade} </p>
                  <p> {medicamento.disponibilidade} </p>
                  <button
            onClick={() => handleFavoritar(medicamento.id)}
            style={{ color: medicamento.favorito_id ? 'red' : 'gray' }}
          >
            &#9829; 
                </button>
                  <button onClick={()=> Comparar(medicamento.nome)}>Comparar</button>
                </div>
            ))     
        }
        </div>
            
             :
             <div> erro no servidor</div>
             
        }
        </>
        :
        <>
        Voce não esta Autenticado
        </>
       }
        </>
    )
}
