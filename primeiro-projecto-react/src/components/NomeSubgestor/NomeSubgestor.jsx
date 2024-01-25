import { useState, useEffect } from "react";
import axios from 'axios'


export const NomeSubGestor = () => {
    const Idusuario = localStorage.getItem('subgestor');
    const [user, SetUser] = useState([]);
    const [dataload, setload] = useState(false)

    const ObterAdminId = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/sub/subtodos/${Idusuario}`);
            SetUser(res.data.data[0].nome)
            setload(true)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        ObterAdminId();
    }, [])

    const nome = user;

    return (
        <>
            {(dataload &&
                <>{nome}</>
            )
            }
        </>
    )
}