import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../../api";
import { toast } from "react-toastify";
import HeaderUser from "../../Dashboard/components/heder/user/headerUser";
import UserSide from "../../Dashboard/components/aside/user/userSide";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import { LogActividades } from "../../Log_Actividades/Log_actividades";
import { MyModal } from "../component/Modal";
import FooterDashboard from "../../Dashboard/components/footer/footer";


export const Comentarios = () => {

  
    const IsAutenticado = !!localStorage.getItem("usuario");
    const  usuario  = localStorage.getItem("usuario")
    const [texto, setTexto] = useState('');

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }

    useEffect(()=>{
        handleShow();
    },[IsAutenticado])

    const handleClose = () => {
        setShow(false)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if(texto.trim()){
        try {
            const res = await api.post("/sms/novasms", { usuario, texto })
            if (res.data.data === "Sucess") {
                toast.success("Enviada com Sucesso");
                setTexto("")
                console.log(res.data)
            } else {
                toast.error("ERRO!")
            }

        } catch (error) {
            console.log(error)
        }
    }else{
        toast.warn("Campo vazio")
    }


    }
    return (
        <>
            {IsAutenticado ?
                <>
                    <LogActividades tipo={"usuario"} />
                    < HeaderUser  disabled={true} />
                    <UserSide />
                    <main id="main" className="main" style={{ backgroundColor: '#00968c53' }}>
                        <div className="pagetitle">
                            <h1 style={{ color: 'white' }}>Dashboard</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/map'}>Map</Link></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                        <section>
                            <div className="container" style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                                <div className='row'>

                                    <form onSubmit={HandleSubmit}>

                                            < textarea cols={30} rows={10} className="form-control" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Digite a sua questão, reclamação, inovações" />
                                            <button className="btn btn-primary" style={{ backgroundColor: '#00968c',width:'100%' }} type="submit">Comentar</button>                                       
                                    </form>

                                </div>

                            </div>

                        </section>

                    </main>

                </>
                :
                <>
                <MyModal show={show} handleClose={handleClose} />
                    Voce não esta Autenticado
                </>
            }
            <FooterDashboard />
        </>

    )
}