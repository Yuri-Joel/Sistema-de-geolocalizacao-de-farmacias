import { useEffect, useState } from "react"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"
import FooterDashboard from "../../../../components/footer/footer"
import {toast} from 'react-toastify'
import { api } from "../../../../../api"
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


export const Formattime = (time) => {
    const date = new Date(time)
    const formattedDate = `${Time(date.getDate())}/${ Time(date.getMonth() + 1)}/${date.getFullYear()}`;
    const formattedTime = `${Time(date.getHours())}:${Time(date.getMinutes())}:${Time(date.getSeconds())}`;

    return `${formattedTime} ${formattedDate} `
}
export  const  Time = (time)=>{

    if(time <= 9){
        const newtime = 0+""+time
        
         return newtime
    }
        return time;  
}

export const AdminMensagens = () => {

    const IsAutenticado = !!localStorage.getItem("usuario")
    const [sms, Setsms] = useState([])
   const [texto , setTexto] = useState("")
   const [tipo, setTipo] = useState("")
   const [Noti, setNoti] = useState([])
    const Send = async ()=>{
        if (tipo && texto.trim()){
        try {
            console.log(tipo)
            const res = await api.post(`/notificacao`, {texto, tipo})
            if(res.data.data === "Notificação Enviada com sucesso" ){

                setTexto("")
                setTipo("")
                ShowNoti();
                toast.success(res.data.data)
            } else{
                toast.error("ERRO no servidor!")
            }
           
        } catch (error) {
            throw (error)
        } finally{
            handlefechar();
        }
    }else{
        toast.warn("digite o tipo de usuario e um texto para enviar a Notificação")
    }
    }
    
    const Showsms = async () => {
        try {
            const res = await api.get(`/sms/mostra`)
            Setsms(res.data.data) 
          
        } catch (error) {
            console.error(error)
        }

    }
    const ShowNoti = async () => {
        try {
            const res = await api.get(`/allnotificacoes`)
           
            setNoti(res.data.data)
        } catch (error) {
            console.error(error)
        }

    }
  

    useEffect(() => {   
       
        Showsms();
        ShowNoti();
    }, [])

    const Eliminar = async(id)=>{
        try {
            const res = await api.delete(`/sms/apagarsms/${id}`)

            console.log(res.data);
                    toast.success(res.data.data)

                    Showsms()
        } catch (error) {
            console.log(error)
        }
    }

    const handlefechar = () => setabrir(false)
    const handleabrir = () => setabrir(true)
    const [abrir, setabrir] = useState(false)

    const EliminarNoti = async(id)=>{
        try {
            const res = await api.delete(`/deletenoti/${id}`)

            console.log(res.data);
                    toast.success(res.data.data)

                    ShowNoti()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        { IsAutenticado ?
        <>     <HeaderAdmin />
            <AdminSide />
            <LogActividades tipo={"administrador"} />
            <main className="main" id="main">
                <div className="container">
                    <div className="row">
            <Button onClick={() => { handleabrir(); }}>Notificar</Button>
                              
                                <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th>mensagem</th>
                                    <th>data de envio</th>
                                    <th>tipo</th>
                                    <th>Eliminar</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {
                                        Noti.map((noti)=>(
                                            <tr key={noti.id}>
                                                <td>{noti.mensagem}</td>
                                                <td>{ Formattime(noti.data_envio)}</td>
                                                <td>{noti.tipo}</td>
                                                <td><button className="btn btn-danger" onClick={() => EliminarNoti(noti.id)}>Eliminar</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Data de envio</th>
                                    <th>Mensagem</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                sms.map((mensagems, index) => ( 
                                   
                                        <tr key={index} >
                                        <th>{mensagems.nome === "Usuário Anônimo" ? mensagems.email : mensagems.nome }</th>
                                            <th>{Formattime(mensagems.data_envio)}</th>
                                            <th>
                                             <textarea className="textarea"  cols="30" rows="6"
                                             value={mensagems.mensagem} disabled    />
                                            </th>
                                            <th><button className="btn btn-danger" onClick={()=> Eliminar(mensagems.id)}>Eliminar</button></th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                                <Modal show={abrir}>
                                    <Modal.Header>
                                        <Modal.Title> Enviar Notoficaço</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <textarea className="form-control" value={texto} onChange={(e) => setTexto(e.target.value)}></textarea>
                                        <select className=' select-group select-group-left' value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                            <option value="" selected>Escolha o usuario que recebera a notificação</option>
                                            <option value="usuario">usuarios</option>
                                            <option value="gestor">gestores</option>
                                        </select>
                                       
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => Send()}>Enviar Notificação</Button>
                                        <Button variant='danger' onClick={handlefechar}>
                                            Cancelar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                    </div>
                </div>
            </main>
            <FooterDashboard />
        </>

        :
        <div>Voce não está Autenticado!</div>
}
        </>
    )
}