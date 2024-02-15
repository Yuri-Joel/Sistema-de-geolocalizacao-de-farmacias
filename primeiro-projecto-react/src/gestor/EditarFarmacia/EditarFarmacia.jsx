import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

export const EditarFarmacia = ()=>{

const [Nomefarma, setNomefarma] = useState("")
const [Niffarma, setNiffarma] = useState("")
const [Telefonefarma, setTelefonefarma] = useState("")
const [Horariofarma, setHorariofarma] = useState("")
const [Email, setEmailFarma] = useState("")


const {id} = useParams()

const IsAutenticado = !!localStorage.getItem("usuario")

const getFarmacia = async()=>{
try {
    const res = await axios.get(`http://localhost:8800/f/obterfarma/${id}`)
    setNomefarma(res.data.data[0].nome)
    setNiffarma(res.data.data[0].nif)
    setEmailFarma(res.data.data[0].email)
    setTelefonefarma(res.data.data[0].telefone)
    setHorariofarma(res.data.data[0].horario_funcionamento)
} catch (error) {
    throw new Error (error)
}
}

useEffect(()=>{
    getFarmacia()
}, [id])

const UpdateFarma =async (e)=> {
        e.preventDefault();

        if(Niffarma && Nomefarma && Email && Telefonefarma && Horariofarma){
            try {
                const res = await axios.put(`http://localhost:8800/f/actuafarma/${id}`, { Nomefarma, Niffarma, Email, Telefonefarma, Horariofarma })
                if (res.data.data === "Farmacia Actualizada com sucesso") {
                    setNomefarma(" ")
                    setEmailFarma(" ")
                    setNiffarma(" ")
                    setTelefonefarma(" ")
                    setHorariofarma(" ")
                    toast.success("Editado com sucesso")

                }
            } catch (error) {
                throw new Error(error)
            }
        } else{
            toast.warn("ERRO! os Campos não podem ser vazios")
        }
    
}

return(
    <>
    {
        IsAutenticado ? 
    <form onSubmit={UpdateFarma}>
        <div>
            <input value={Nomefarma} placeholder="nome da farmacia" onChange={(e)=> setNomefarma(e.target.value)} />
        </div>
            <div>
                <input value={Niffarma} placeholder="Nif" onChange={(e) => setNiffarma(e.target.value)} />
            </div>
            <div>
                <input value={Email} placeholder="email ex: teste@gmail.com" onChange={(e) => setEmailFarma(e.target.value)} />
            </div>
            <div>
                <input value={Telefonefarma} placeholder="telefone ex 932434..." onChange={(e) => setTelefonefarma(e.target.value)} />
            </div>
            <div>
                <input value={Horariofarma} placeholder="ex: 11H - 22h" onChange={(e) => setHorariofarma(e.target.value)} />
            </div>
    <div>
        <button type="submit">Editar</button>
    </div>

    </form>:
    <>
            Voce não está Autenticado! por favor faça login 
    </>
    }
    </>
)
}