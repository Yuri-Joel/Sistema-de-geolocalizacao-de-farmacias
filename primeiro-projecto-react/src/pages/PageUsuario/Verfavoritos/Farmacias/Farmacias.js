import axios from "axios"
import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export const FavoritosFarmacia = ()=>{

  const {id}= useParams()
    const [Farma, setfarma] = useState([]);
   

    const Favfarma = async ()=>{
        try{
            const res =  await axios.get(`http://localhost:8800/fav/favoritos/${id}`)
             setfarma(res.data.data)
        }
        catch(err) {
            toast.error(err)
        };
    }
    useEffect(()=>{
        Favfarma()
    })


    const Delete = async(id)=>{
        
        await axios.delete(`http://localhost:8800/fav/favoritodel/${id}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.data){
               
                toast.success(res.data.data)
            }
            
        }).catch((err) => {
            toast.error(err)
        });
    }
    return(
        <>
            <table>
                <tbody>
                    {
            Farma.map((farmacia)=>{
                <tr key={farmacia.id}>
                    <td>{farmacia.nome}</td>
                    <td>{farmacia.endereco}</td>
                    <td>{farmacia.telefone}</td>
                    <td>{farmacia.nif}</td>
                    <td>
                        <button onClick={()=> Delete(farmacia.id)}>Eliminar</button>
                    </td>
                </tr>
            })}
             </tbody>
        
        </table>
        
        </>

    )
}