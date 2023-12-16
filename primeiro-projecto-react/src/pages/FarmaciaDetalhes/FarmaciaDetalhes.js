import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { FarmaciaDetals } from '../../services/FarmaciaDetals';
import {favoritarM} from '../../services/favoritar'


export const FarmaciaDetalhes = ()=>{
const {id} = useParams()
const [Medi, setMEdi] = useState([])

const handledetalhes = async  ()=>{
    const resposta = await FarmaciaDetals(id)
    setMEdi(resposta)

}
useEffect(()=>{
    handledetalhes()
},[])

const favoritarMedi =async(id)=>{
const resposta = await favoritarM(id)
}
    return(
        <>
        {
            Medi.map((med)=>{
                <div key={med.id}>
                  <h2> {med.nome}</h2> 
                  <p> { med.tipo} </p>
                  <p> { med.informacoes} </p>
                  <h2>{med.preco}</h2>
                  <div>
                    <img src={med.imagem_path} />
                  </div>
                  <p> {med.data_validade} </p>
                  <p> {med.disponibilidade} </p>
                  <button onClick={()=> favoritarMedi(med.id)}>Favoritar</button>
                </div>
            })
        }
        </>
    )
}