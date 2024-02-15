import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderUser from "../../../Dashboard/components/heder/user/headerUser";
import { Nome } from "../../../components/NomeUser/Nome";
import UserSide from "../../../Dashboard/components/aside/user/userSide";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import FooterDashboard from "../../../Dashboard/components/footer/footer";
import { Card } from "react-bootstrap";
import {LogActividades} from "../../../Log_Actividades/Log_actividades";



export const FavoritosMedicamentos = () => {


    const IsAutenticado = !!localStorage.getItem("usuario");
        
    const {id} = useParams()
    const [med, setMedi] = useState([])

    const FavMedi = async () => {

        try {
            const res = await axios.get(`http://localhost:8800/fav/favmedi/${id}`)
            setMedi(res.data.data)
        }
        catch (error) {
            toast.error(error)
        };
    }

    useEffect(() => {
        FavMedi()
    }, [])


    const Deletar = async (id) => {
        console.log(id);
        const tabela = "favoritos_medicamentos";

        await axios.delete(`http://localhost:8800/fav/favoritodel/${id}/${tabela}`)
            .then((res) => {
                
                if (res.data.data) {

                    toast.success(res.data.data)
                    FavMedi();
                }

            }).catch((err) => {
                toast.error(err)
            });
    }
    return (
        <>
        { IsAutenticado ?
        <>
                    <LogActividades tipo={"usuario"} />
            <HeaderUser nome={<Nome />} placeholder={'pesquisar'} />
            <UserSide />
           
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1 style={{ color: 'white' }}>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/map'}>Map</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                    <div className="row">
                        <Card>
                          
                            <div className="container">
                               <div className="row">
                               <table className="table">
                               <thead>
                                    <tr>
                                        <th>Nome </th>
                                        <th>Preço</th>
                                        <th>tipo</th>
                                        <th>data_validade</th>
                                        <th>Farmacia</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        med.map((medi) => (
                                            <tr key={medi.ide}>
                                                <td>{medi.nome}</td>
                                                <td>{medi.preco}</td>
                                                <td>{medi.tipo}</td>
                                                <td>{medi.data_validade}</td>
                                                <td>{medi.nome_farmacia}</td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                                                        <Link to={`/farmacia/${medi.farma}/${id}`}>
                                                            <button
                                                                className='btn btn-success' style={{ backgroundColor: '#00968c' }}
                                                            >
                                                                Ver Farmacia
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>

                                                <td>
                                                    <Link className="btn btn-danger btn-sm" title="Remove my profile image">
                                                        <i className="bi bi-trash" onClick={() => Deletar(medi.ide)}></i>

                                                    </Link>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                </table>
                                </div>
                               </div>
                               
                               


                         


                        </Card>

                    </div>

                </div>

            </main>

            <FooterDashboard />

        </>
        : 
        <>
        Voce Não está Autenticado! Por favor faça Login 
        </>
        }
        </>
    )
}