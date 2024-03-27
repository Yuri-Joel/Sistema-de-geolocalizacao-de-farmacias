import { useState, useEffect } from "react";
import { api } from "../../api";


export const NomeGestor = () => {
    const Idusuario = localStorage.getItem('usuario');
    const [user, SetUser] = useState("");
    const [dataload, setload] = useState(false)

    const ObterAdminId = async () => {
        try {
            const res = await api.get(`/ges/obtera/${Idusuario}`);
            SetUser(res.data.data[0].nome)
            setload(true)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        ObterAdminId();
    }, [])

    const nome = user.split(" ");

    const NomeAbreviado = nome[0] + " " + nome[nome.length - 1]
    
    return (
        <>
            {(dataload &&
                <>{NomeAbreviado}</>
            )
            }
        </>
    )
}