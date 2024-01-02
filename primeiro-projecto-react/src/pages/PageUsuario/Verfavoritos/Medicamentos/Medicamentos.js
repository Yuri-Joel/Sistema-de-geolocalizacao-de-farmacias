import axios from "axios"
import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {Logout} from '../../../../components/Logout/Logout'
import { Nome } from "../../../../components/NomeUser/Nome";


export const FavoritosMedicamentos = ()=>{

  const {id}= useParams()
    const [med, setMedi] = useState([])

    const FavMedi = async ()=>{

        try{
            const res = await axios.get(`http://localhost:8800/fav/favmedi/${id}`)     
            setMedi(res.data.data)
        }
         catch (error){
            toast.error(error)
        };
    }
    
    useEffect(()=>{
        FavMedi()
    },[])


    const Delete = async(id)=>{
        
        await axios.delete(`http://localhost:8800/fav/favoritodel/${id}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.data){
               
                toast.success(res.data.data)
                FavMedi();
            }
            
        }).catch((err) => {
            toast.error(err)
        });
    }
    return(
        <>
        <Nome />
        <Logout />
            <table>
                <thead>
                    <tr>
                    <th>Nome </th>
                    <th>Preço</th>
                    <th>tipo</th>
                    <th>data_validade</th>
                    <th>Farmacia</th>
                    </tr>
                </thead>
                <tbody>
                    {
            med.map((medi)=>(
                <tr key={medi.ide}>
                    <td>{medi.nome}</td>
                    <td>{medi.preco}</td>
                    <td>{medi.tipo}</td>
                    <td>{medi.data_validade}</td>
                    <td>{medi.nome_farmacia}</td>
                    <td>
                        <button onClick={()=> Delete(medi.ide)}>Eliminar</button>
                    </td>
                </tr>
            ))}
             </tbody>
        
        </table>
        
        </>

    )
}