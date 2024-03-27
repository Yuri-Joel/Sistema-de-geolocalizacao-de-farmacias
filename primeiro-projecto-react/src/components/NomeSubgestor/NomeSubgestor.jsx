import { useState, useEffect } from "react";
import { api } from "../../api";


export const NomeSubGestor = () => {
    const Idusuario = localStorage.getItem('subgestor');
    const [user, SetUser] = useState("");
    const [dataload, setload] = useState(false)

    const ObterAdminId = async () => {
        try {
            const res = await api.get(`/sub/obtera/${Idusuario}`);
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
    let NomeAbreviado = ""
        if(nome.length === 1){
            
        NomeAbreviado = nome[0]
        } else{
         NomeAbreviado = nome[0] + " " + nome[nome.length - 1]
   }
    return (
        <>
            {(dataload &&
                <>{NomeAbreviado}</>
            )
            }
        </>
    )
}