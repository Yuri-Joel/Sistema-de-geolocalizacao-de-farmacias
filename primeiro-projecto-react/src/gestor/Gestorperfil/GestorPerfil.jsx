import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import imagem from '../../assets/Screenshot_20240110-233026.png'
import { HeaderGestor } from '../../Dashboard/components/heder/gestor/headerGestor';
import GestorSide from '../../Dashboard/components/aside/gestor/gestorSide';
import { NomeGestor } from '../../components/NomeGestor/NomeGestor';
import FooterDashboard from '../../Dashboard/components/footer/footer';
import { NomeSubGestor } from '../../components/NomeSubgestor/NomeSubgestor';
import { LogActividades } from '../../Log_Actividades/Log_actividades';



export default function Gestorperfil() {

    const [admin, setadmin] = useState([])
   
    let Idusuario 
    const subgestor = !!localStorage.getItem("subgestor");
   let baseUrl = ""
    if(subgestor){
       Idusuario = localStorage.getItem("subgestor");
         baseUrl = "http://localhost:8800/sub"
    } else{
        Idusuario = localStorage.getItem("usuario");
        baseUrl = "http://localhost:8800/ges"
    }

    const [userPhoto, setUserPhoto] = useState('');
    const [newImage, setNewImage] = useState(null);




    const ObterUserId = async () => {
        try {
            const res = await axios.get(`${baseUrl}/obtera/${Idusuario}`);
            setadmin(res.data.data)
            setUserPhoto(res.data.data[0].foto);
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        ObterUserId();
    }, [])

    const [dataload, setload] = useState(false)
    const [nome, setnome] = useState('');
    const [email, setemail] = useState('');
    const [telefone, setTelefone] = useState('')
    const [Alterar, setsenha] = useState({
        senhaActual: '',
        novaSenha: ''
    })
    const [ConfimarSenha, setConfirmar] = useState('')


    const HandleSubmit = async (e) => {
        e.preventDefault();

        if ((Alterar.novaSenha === ConfimarSenha) && Alterar.senhaActual && ConfimarSenha && Alterar.novaSenha) {
            await axios.put(`${baseUrl}/actuasenha/${Idusuario}`, Alterar)
                .then(res => {
                    console.log(res.data);
                    if (res.data.data === "Actualizada") {

                        toast.success("Senha Actualizada")

                    } else {
                        toast.warn("erro ao logar neste servidor");
                    }
                })
                .catch(err => toast.warn(err))
        } else {
            toast.error("ERRO!")
        }
    }


    const ObterEditarUser = async () => {

        try {
            const res = await axios.get(`${baseUrl}/obtera/${Idusuario}`)

            console.log(res.data.data)
            setnome(res.data.data[0].nome);
            setemail(res.data.data[0].email);
            setload(true)

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        ObterEditarUser();
    }, [Idusuario]);



    const Navigate = useNavigate();

    const ActualizarUser = async (e) => {
        e.preventDefault();
       
        handleUploadNewImage();

        try {
            const res = await axios.put(`${baseUrl}/actuages/${Idusuario}`, {nome, email})
            console.log(res.data.data)
            toast.success("Perfil Actualizado");
            ObterUserId();
            Navigate("/gestor")
        } catch (error) {
            console.error(error);
        }
    }
    const handleUploadNewImage = async () => {
        if (!newImage) {
            console.log('Nenhuma imagem selecionada.');
            return;
        }

        let tipo = ""
        if(subgestor){
            tipo = "subgestores"
        } else{
         tipo = "gestor";
           
        }
        
        const formData = new FormData();
        formData.append('image', newImage);
        formData.append('id', Idusuario);
        formData.append("tipo", tipo)

        try {
            const response = await axios.post(`http://localhost:8800/upload`, formData);
            console.log(response.data)
            setUserPhoto(response.data.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const DeletarFoto = (id) => {
        try {
            const res = axios.delete(`${baseUrl}/delfoto/${id}`)
            if (res.data.data === "Sucess") {
                toast.success(res.data.data)
            }
        } catch (error) {
            console.log(`${error}`)
        }

    }
    return (
<>
            <LogActividades tipo={"gestor"} />
<HeaderGestor />

<GestorSide />
<main id="main" className="main">

<div className="pagetitle">
<h1>Perfil</h1>
<nav>
<ol className="breadcrumb">
<li className="breadcrumb-item"><Link to={'/gestor'}>Home</Link></li>
<li className="breadcrumb-item">Usuario</li>
<li className="breadcrumb-item active">Perfil</li>
</ol>
</nav>
</div>

<section className="section profile">
<div className="row">
<div className="col-xl-4">

<div className="card">
<div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
    {userPhoto ?
        <img src={`http://localhost:8800/${userPhoto}`} alt="Profile" className="rounded-circle" />
        :
        <img src={imagem} alt='profile' className='rounded-circle' />
    }
    <h2>{ subgestor ? <NomeSubGestor /> : <NomeGestor />}</h2>
    <h3>Gestor 00{Idusuario}</h3>

</div>
</div>

</div>

<div className="col-xl-8">

<div className="card">
<div className="card-body pt-3">

    <ul className="nav nav-tabs nav-tabs-bordered">

        <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Ver meu Perfil</button>
        </li>

        <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Editar</button>
        </li>

        <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Alterar senha</button>
        </li>

    </ul>
    <div className="tab-content pt-2">
        {
            admin.map((usuario) => (
                <div key={usuario.id}>
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <h5 className="card-title">Meu Perfil</h5>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Nome</div>
                            <div className="col-lg-9 col-md-8">{usuario.nome}</div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Constacto</div>
                            <div className="col-lg-9 col-md-8">{usuario.telefone}</div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Email</div>
                            <div className="col-lg-9 col-md-8">{usuario.email}</div>
                        </div>

                    </div>
                </div>
            ))}

        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <button onClick={() => DeletarFoto(Idusuario)}>Eliminar Foto</button>
            {
                (dataload &&
                    <form onSubmit={ActualizarUser}>
                        <div className="row mb-3">
                            <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Imagem</label>
                            <div className="col-md-8 col-lg-9">



                                {/* Botão para mudar a foto */}


                                {/* Outras informações do perfil do usuário */}
                                {userPhoto ?
                                    <img src={`http://localhost:8800/${userPhoto}`} alt="Profile" className="rounded-circle" />
                                    :
                                    <img src={imagem} alt='profile' className='rounded-circle' />
                                }
                                <div className="pt-2">
                                    <input type="file" className="btn btn-primary btn-sm" title="Upload new profile image" onChange={(e) => setNewImage(e.target.files[0])} />
                                    <br></br>
                                    <button className="btn btn-primary btn-sm" onClick={() => handleUploadNewImage} ></button>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Nome</label>
                            <div className="col-md-8 col-lg-9">
                                <input name="fullName" type="text" className="form-control" id="fullName" value={nome} onChange={(e) => setnome(e.target.value)} />
                            </div>
                        </div>


                        *<div className="row mb-3">
<label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Contacto</label>
<div className="col-md-8 col-lg-9">
<input name="phone" type="text" className="form-control" id="Phone"  value={telefone} onChange={(e)=> setTelefone(e.target.value)}/>
</div>
</div>

                        <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                            <div className="col-md-8 col-lg-9">
                                <input name="email" type="email" className="form-control" id="Email" value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" style={{ background: '#00968c', width: '14rem' }}>Salvar</button>
                        </div>
                    </form>
                )
            }
        </div>

        <div className="tab-pane fade pt-3" id="profile-change-password">

            <form onSubmit={HandleSubmit}>

                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Senha actual</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="password" type="password" className="form-control" id="currentPassword" onChange={(e) => setsenha({ ...Alterar, senhaActual: e.target.value })} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Nova Senha</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newpassword" type="password" className="form-control" id="newPassword" onChange={(e) => setsenha({ ...Alterar, novaSenha: e.target.value })} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Confirmar a Senha</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" value={ConfimarSenha} onChange={(e) => setConfirmar(e.target.value)} />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary" style={{ background: '#00968c', width: '14rem' }}>Salvar</button>
                </div>
            </form>

        </div>

    </div>

</div>
</div>

</div>
</div>
</section>

</main>

<FooterDashboard />
</>
)
}
