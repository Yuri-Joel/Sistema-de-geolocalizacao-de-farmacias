import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const EditarFarma = () => {

    

    const IsAutenticado = !!localStorage.getItem("usuario")
    const navi = useNavigate()
   
 const [endereco, setendereco] = useState("")
    const [longitude, setlongitude] = useState("")
    const [latitude, setlatitude] = useState("")

    const { id } = useParams()

    const getFarmacia = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/f/obterfarma/${id}`)
            
            setlatitude(res.data.data[0].latitude)
            setendereco(res.data.data[0].endereco)
            setlongitude(res.data.data[0].longitude)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getFarmacia()
    }, [id])

    const UpdateFarma = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8800/f/actualifarmaAdmin/${id}`, { endereco,latitude, longitude })
            if (res.data.data === "Farmacia Actualizada com sucesso") {
                setendereco(" ")
                setlongitude(" ")
                setlatitude(" ")
                
                toast.success("Editado com sucesso")

            }
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <>

{
                IsAutenticado ? 
                
                <form onSubmit={UpdateFarma}>
                    <div>
                        <input value={endereco} placeholder="seu enderenço" onChange={(e) => setendereco(e.target.value)} />
                    </div>
                    <div>
                        <input value={latitude} placeholder="latitude ex: -8.7364368" onChange={(e) => setlatitude(e.target.value)} />
                    </div>
                    <div>
                        <input value={longitude} placeholder="longitude ex: 13.734368" onChange={(e) => setlongitude(e.target.value)} />
                    </div>

                    <Link to={`#`}>
                        <button>Ir ao Mapa</button>
                    </Link>
                    <div>
                        <button type="submit">Editar</button>
                    </div>

                </form>
                :
                <>
            Voce não está Autenticado! por favor faça login 
                </>

}
         
        </>
    )
}