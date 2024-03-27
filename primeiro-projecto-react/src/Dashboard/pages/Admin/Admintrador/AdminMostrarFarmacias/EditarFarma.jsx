import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"

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
        <HeaderAdmin />
            <AdminSide />
       <main className="amin" id="main">

  <div className="container">
    <div className="row">
{
                IsAutenticado ? 
                <>
                <form onSubmit={UpdateFarma}>
                    <div>
                        <input className="form-control" value={endereco} placeholder="seu enderenço" onChange={(e) => setendereco(e.target.value)} />
                    </div>
                    <div>
                        <input className="form-control" value={latitude} placeholder="latitude ex: -8.7364368" onChange={(e) => setlatitude(e.target.value)} />
                    </div>
                    <div>
                        <input className="form-control" value={longitude} placeholder="longitude ex: 13.734368" onChange={(e) => setlongitude(e.target.value)} />
                    </div>

                                 
                    <div>
                        <button className="btn btn-primary" type="submit">Editar</button>
                    </div>

                </form>
                   <Link to={`https://www.google.com/maps/@-8.8735744,13.254656,12z?hl=es&entry=ttu`} target="_blank">
                        <button className="btn btn-primary">Ir ao Mapa</button>
                    </Link>
                                </>
                :
                <>
            Voce não está Autenticado! por favor faça login 
                </>
}
</div>
  </div>
</main>      
        </>
    )
}