import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LogActividades } from "../../Log_Actividades/Log_actividades"
import { HeaderGestor } from "../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../Dashboard/components/footer/footer"
import { api } from "../../api"

export const EditarFarmacia = () => {

    const [Nomefarma, setNomefarma] = useState("")
    const [Niffarma, setNiffarma] = useState("")
    const [Telefonefarma, setTelefonefarma] = useState("")
    
    const [Email, setEmailFarma] = useState("")


    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const IsAutenticado = !!localStorage.getItem("usuario")

    const getFarmacia = async () => {
        try {
            const res = await api.get(`/f/obterfarma/${id}`)
            setNomefarma(res.data.data[0].nome)
            setNiffarma(res.data.data[0].nif)
            setEmailFarma(res.data.data[0].email)
            setTelefonefarma(res.data.data[0].telefone)
           
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getFarmacia()
    }, [id])

    const UpdateFarma = async (e) => {
        e.preventDefault()
        setloading(true)

        if (Niffarma && Nomefarma && Email && Telefonefarma ) {
            try {
                const res = await api.put(`/f/actuafarma/${id}`, { Nomefarma, Niffarma, Email, Telefonefarma})
                if (res.data.data === "Farmacia Actualizada com sucesso") {
                    setNomefarma(" ")
                    setEmailFarma(" ")
                    setNiffarma(" ")
                    setTelefonefarma(" ")
                 
                    toast.success("Editado com sucesso")

                } else{
                    toast.warn("ERRO! por favor digite correctamente")
                }
            } catch (error) {
                throw new Error(error)
            } finally {
                setloading(false)
            }
        } else {
            toast.warn("ERRO! os Campos não podem ser vazios")
        }

    }

    return (
        <>
            <LogActividades tipo={"gestor"} />
            <HeaderGestor />
            <GestorSide />
            <main className="main" id="main">
                <div className="container">
                    <div className="row">


                        {
                            IsAutenticado ?
                                <form onSubmit={UpdateFarma}>
                                    <div>
                                        <input className="form-control" value={Nomefarma} placeholder="nome da farmacia" onChange={(e) => setNomefarma(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className="form-control" value={Niffarma} placeholder="Nif" onChange={(e) => setNiffarma(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className="form-control" value={Email} placeholder="email ex: teste@gmail.com" onChange={(e) => setEmailFarma(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className="form-control" value={Telefonefarma} placeholder="telefone ex 932434..." onChange={(e) => setTelefonefarma(e.target.value)} />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" type="submit">Atualizar</button>
                                    </div>

                                </form> :
                                <>
                                    Voce não está Autenticado! por favor faça login
                                </>
                        }
                        {(loading &&
                            <div className="loading" id="loading">
                                <div className="spinner"></div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <FooterDashboard />
        </>
    )
}