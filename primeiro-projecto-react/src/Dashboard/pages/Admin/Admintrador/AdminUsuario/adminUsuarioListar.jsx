import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import imagem from '../../../../../assets/Screenshot_20240110-233026.png'





export const AdminListarUsuario = ()=>{

    const [users, setusers] = useState([])
    

    const ListarUsuario = async()=>{
        try {
            
            const res = await axios.get(`http://localhost:8800/api/dados`)
                    setusers(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const Deletar = async(id)=>{
        try {
            
            const res = await axios.delete(`http://localhost:8800/api/deletar/${id}`)
                    toast.success(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }

useEffect(()=>{
    ListarUsuario()
},[])

    return(
        <>
        {
            users.map((user)=>(
                <div key={user.id}>
                    <div>
                        {
                            user.foto ?
                        <img src={`http://localhost:8800/${user.foto}`} />
                        :
                        <img src={imagem} alt='carregando...' />
                        }
                    </div>
                    <h5>{user.nome}</h5>
                    <h5>{user.email}</h5>
                    <div>
                        <button onClick={()=> Deletar(user.id)}></button>
                    </div>
                </div>
            ))
            
        }
        
        </>
    )
}