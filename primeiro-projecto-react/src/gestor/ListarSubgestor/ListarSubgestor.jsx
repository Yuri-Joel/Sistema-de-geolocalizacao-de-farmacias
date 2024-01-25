import { useEffect, useState } from "react"
import imagem from '../../assets/Screenshot_20240110-233026.png'
import axios from "axios"
import { toast } from "react-toastify"




export const ListarSubGestor = ()=>{

    const [Subgestor, setSubgestor] = useState([])
    const id = localStorage.getItem("usuario")

    const ListarGestor = async ()=>{
        try {
            
            const res = await axios.get(`http://localhost:8800/sub/subgestor/${id}`)
                    setSubgestor(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
            ListarGestor();
    },[])

    const Eliminar = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:8800/sub/subdelges/${id}`)
                ListarGestor();
                toast.success(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
      {    Subgestor.map((sub)=>(
            <div key={sub.id}>
                { sub.foto ?
                <div>
                    <img src={`http://localhost:8800/${sub.foto}`} alt="profile"/>
                </div> 
                :
                <div>
                <img src={imagem} alt="profile"/>
                </div> 
                }
                <div>{sub.nome}</div>
                <div>{sub.email}</div>
                <div>{sub.telefone}</div>
                <div>
                    <button onClick={()=> Eliminar(sub.id)}>Eliminar</button>
                </div>
            </div>

      ))  
      }
        </>
    )

}