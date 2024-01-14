import axios from "axios"
import { useEffect, useState } from "react"
import imagem from '../../../../../assets/Screenshot_20240110-233026.png'




export const AdminListarGestor = ()=>{

const [Gestores, setGestores] = useState([])

const ListarGestor = async()=>{
    
try {
    const res = await axios.get(`http://localhost:8800/ges/todos`)
        setGestores(res.data.data)
} catch (error) {
    
}
}
const Deletar = async(id)=>{
    try {
        
        const res = await axios.delete(`http://localhost:8800/ges/delges/${id}`)
                toast.success(res.data.data)

    } catch (error) {
        console.error(error)
    }
}
useEffect(()=>{
    ListarGestor();
},[])

    return(
        <>
        <div>
            {
              Gestores.map((ges)=>(
                <div key={ges.id}>
                    <div>
                        { ges.foto ?
                        <img src={`http://localhost:8800/${ges.foto}`} alt="carregando.." />
                    : 
                    <img src={imagem} alt="carregando.." />
                    }
                    </div>
                    <h6>{ges.nome}</h6>
                    <h6>{ges.email}</h6>
                    <div>

                    <button onClick={()=> Deletar(ges.id)}>Eliminar</button>    
                       </div> 

                </div> 
              ))  
            }

        </div>
        
        </>
    )
}