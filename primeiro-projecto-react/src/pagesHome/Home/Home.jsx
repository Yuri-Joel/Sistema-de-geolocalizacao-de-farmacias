import { Link } from "react-router-dom"
import { ContarUser } from "../Components/Contagem"
import { CountFarmacias } from "../Components/Contagem"
import k from '../../assets/Geo Farma/Geo Farma.png'
//import homePhoto from '../../assets/farmaceutico-americano-africano-trabalhando-em-farmacia-na-farmacia-hospitalar-saude-africana.jpg'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import '../../home.css'
import H from './pngeg.png'
import homePhoto1 from './bb.png'
import homePhoto2 from './cc.png'
import homePhoto3 from './dd.png'
import homePhoto4 from './aa.png'
import homePhoto5 from './ee.jpg'
import homephoto6 from "./ff.jpg"
import accao from "./accao.jpg"
import A3 from "./logo.png"
import A1 from './client-1.png'
import A2 from './client-2.png'
import A5 from './client-5.png'
import A8 from './client-8.png'
import Jk from './3D Original.png'
import Lumba from './INTENSO-2.png'
import Mako from './Mako.png'
import { api } from "../../api";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export const Home = () => {

    const [farma, SetFarmacias] = useState([])
    const [Medicamentos1, SetMedicamentos1] = useState([])
    const [Medicamentos2, SetMedicamentos2] = useState([])
    const [Medicamentos3, SetMedicamentos3] = useState([])
    const [load, setload] = useState(false)
    const IsAuntenticado = !!localStorage.getItem("usuario")
    const [texto, settexto]= useState("")

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [homePhoto1, homePhoto2, homePhoto3, homePhoto5,homePhoto4, homephoto6]; // Lista de imagens
    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
       
    };
   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Troca de imagem a cada 5 segundos

        return () => clearInterval(interval);
    }, []);


    const FarmaciasData = async () => {
        try {
            const res = await api.get(`/f/todasfarmahome`)
            SetFarmacias(res.data.data)
            setload(true)
            console.log(res.data.data)
           
        } catch (error) {
            console.log(error)
        }

    }
    const MedicamentosData = async () => {
        try {
            const res = await api.get(`/m/meditop`)
           SetMedicamentos1([res.data.data[0]])
            SetMedicamentos2([res.data.data[1]])
            SetMedicamentos3([res.data.data[2]])
            setload(true)
            console.log(res.data.data)
            console.log(Medicamentos1);
        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect(()=>{
        FarmaciasData();
        MedicamentosData();
    },[])
    const [dados, setDados]= useState({
        nome:"",email: "", subject:""
    })
     const [error, seterror]= useState(false)
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setload(true)
        seterror(false)
        const ValidateEmail = async (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-z]{2,6}$/i;

            return regex.test(email)
        }
        if (texto.trim() && ValidateEmail(dados.email)) {
            
           
            try {
                const res = await api.post("/sms/novasms", { texto, email: dados.email, usuario: 0 })
                if (res.data.data === "Sucess") {
                   
                    settexto("")
                    setDados({nome:"" ,email:"", subject: ""})
                    console.log(res.data)
                } else {
                    console.log(res.data)
                }

            } catch (error) {
                console.log(error)
            } finally{
                setload(false)
            }
        }  else{
            seterror(true)
        }
    }
   const  Estrelas = (valor)=>{
    if(valor <=2){ 
    return (
    <>
    <p>1 estrela</p>
    <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem"}}></i>
    </>)
    } if(valor > 2 && valor <= 20){
        return (
            <>
                <p>2 estrela</p>
            <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
            <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
            </>)
    }
       if (valor > 20 && valor <= 35) {
           return (
               <>
                   <p>3 estrela</p>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
               </>)
       }
       if (valor > 35 && valor <= 50) {
           return (
               <>
                   <p>4 estrela</p>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
               </>)
       }
       if (valor > 50) {
           return (
               <>
                   <p>5 estrela</p>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i>
                   <i className='bi bi-star' style={{ color: "yellow", width: '30rem', height: '30rem', fontSize: "2rem" }}></i> 
               </>)
       }
  
   }

    return (
        <>




            <header id="heade" className="fixed-top ">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-9 d-flex align-items-center justify-content-lg-between">
                            <a href="#hero" className="logo d-flex align-items-center">
                                <img src={k} alt="eee" />
                                <span className="d-none d-lg-block" style={{ color: 'white' }}>GeoFarma</span>
                            </a>
                            <nav id="navbar" className="navbar order-last order-lg-0">
                                <ul>
                                    <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                                    <li><a className="nav-link scrollto" href="#about">Sobre</a></li>
                                    <li><a className="nav-link scrollto" href="#services">Fármacias</a></li>
                                    <li><a className="nav-link scrollto" href="#pricing">Produtos</a></li>
                                    <li><a className="nav-link scrollto" href="#contact">Contactos</a></li>
                                </ul>
                                <i className="bi bi-list mobile-nav-toggle"></i>
                            </nav>
                            {
                                IsAuntenticado ? <>
                                    <Link to={'/map'} className="btn" style={{ listStyle: 'none', backgroundColor: '#125e9d', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center' }}>Mapa</Link>  
                                </>:
                                <>

                                        <Link to={'/cadastrar'} className="btn" style={{ listStyle: 'none', backgroundColor: '#125e9d', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center',marginRight:"1rem"}}>Cadastrar</Link>
                                        

                                        <Link to={'/login'} className="btn" style={{ listStyle: 'none', backgroundColor: '#125e9d', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center'}}>Login</Link>
                                </>
                            }
                            
                        </div>
                    </div>

                </div>
            </header>
            <section id="hero" className="d-flex flex-column justify-content-center" 
           >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentImageIndex ? 1 : 0,
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'top center',
                            backgroundSize: 'cover',
                            transition: 'opacity 1s ease-in-out',
                            animation: `${index === currentImageIndex ? 'fade-in' : 'fade-out'} 1s forwards`,
                            filter: 'brightness(65%)'
                        }}
                    />
                ))} <button
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '20px',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '34px',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                    onClick={() =>{ goToPreviousImage()}}
                >
                    <BsChevronLeft size={55} />
                </button> 
                <button
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '20px',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '34px',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                    onClick={() => { goToNextImage() }}
                >
                    <BsChevronRight size={55} />
                </button>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <h1>GeoFarma poupe o seu tempo <br /> Facilite a sua vida</h1>
                            <h2>oferecemos confiaça e segurança aos nossos clientes </h2>
                            <Link to="/map"><button className='btn btn-primary' style={{ backgroundColor: '#00968c' ,width:'10rem',height:'3rem'}}>Localizar</button></Link>
                            <div><h1 style={{ color: 'white' }}><ContarUser />: Usuarios</h1></div>
                            <div><h1 style={{ color: 'white' }}> <CountFarmacias />: Farmácias</h1></div>
                        </div>
                    </div>
                </div>
            </section>
            <main>
                <section id="about" className="about">
                    <div className="container">

                        <div className="section-title">
                            <h2>Sobre</h2>
                            <p>Na GeoFarma, estamos empenhados em proporcionar uma revolução no acesso aos cuidados de saúde. Nossa equipe é composta por profissionais dedicados, comprometidos em tornar o processo de encontrar os medicamentos de que você precisa uma experiência simples, eficiente e confiável.</p>
                        </div>

                        <div className="row content">
                            <div className="col-lg-6">
                                <p>
                                    Cada farmácia em nossa rede é cuidadosamente selecionada e verificada para garantir que ofereça uma variedade abrangente de medicamentos de alta qualidade. 
                                </p>
                                <ul>
                                    <li><i className="ri-check-double-line"></i> Isso significa que você pode confiar que encontrará não apenas o medicamento necessário, mas também a qualidade e a eficácia que você merece.</li>
                                    <li><i className="ri-check-double-line"></i> Sinta a diferença desde o primeiro toque - cada produto é projetado para superar suas expectativas</li>
                                    <li><i className="ri-check-double-line"></i> Confie em nós para oferecer não apenas produtos, mas sim um estilo de vida elevado que você merece.</li>
                                </ul>
                            </div>
                            <div className="col-lg-6 pt-4 pt-lg-0">
                                <p>
                                    Estamos comprometidos em ser sua parceira confiável em cada etapa do seu caminho para uma vida mais saudável e feliz
                                </p>
                                <a href="#" className="btn-learn-more">Ler Mais</a>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="services" className="services">
                    <div className="container">

                        <div className="section-title">
                            <h2>Fámacias</h2>
                            <p>Em um mundo onde a saúde é a prioridade número um, encontrar uma farmácia que você possa confiar é essencial. É por isso que estamos aqui. Bem-vindo à nossa GEofarma, onde cada produto reflete nosso compromisso com a excelência, com a saúde e com o bem-estar da comunidade que servimos.</p>

                               <p>Nossa missão é simples: proporcionar a você e à sua família acesso conveniente aos melhores produtos de saúde e bem-estar. Com uma ampla gama de produtos com suas farmacias que vão desde medicamentos essenciais até produtos de cuidados pessoais e suplementos nutricionais.</p>
                        </div>

                        <div className="row">
                          
                            {
                                farma.map((farmacia)=>(
                                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={farmacia.id}>
                                        <div className="icon-box">
                                            <div className="icon"><i className="bx bxl-dribbble"></i></div>
                                            <h4><Link>{farmacia.nome}</Link></h4>
                                            <p>usuarios que favoritaram  <strong style={{fontSize: "1.5rem"}}>{farmacia.total}</strong>, numero de estrelas: </p>
                                           <>{Estrelas(farmacia.total)}</>
                                           
                                        </div>
                                    </div>
                                ))
                            }
                     
                        </div>
                    </div>
                </section>

                <section id="cta" className="cta" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 text-center text-lg-start">
                                <h3>Chamada para acção</h3>
                                <p> Com nosso sistema de geolocalização de farmácias, estamos colocando o poder nas suas mãos. Imagine poder localizar instantaneamente a farmácia mais próxima que tem o medicamento que você procura, onde quer que você esteja. Nosso sistema inteligente e intuitivo faz exatamente isso. Não importa se você está em casa, no trabalho ou em trânsito, estamos aqui para conectá-lo com as farmácias que têm o que você precisa, quando você precisa.</p>
                            </div>
                            <div className="col-lg-3 cta-btn-container text-center">
                                <Link className="cta-btn align-middle" to={"/map"}>Entrar sem Conta</Link>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="features" className="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <div className="icon-box mt-5 mt-lg-0">
                                    <i className="bx bx-receipt"></i>
                                    <h4>Descubra a Diferença com GeoFarma</h4>
                                    <p>

                                        Quando se trata da sua saúde, não fazemos concessões. Cada farmácia em nossa rede é cuidadosamente selecionada e verificada para garantir que ofereça uma ampla variedade de medicamentos de alta qualidade. </p>
                                </div>
                                <div className="icon-box mt-5">
                                    <i className="bx bx-cube-alt"></i>
                                    <h4>Junte-se a Nós Hoje Mesmo: Encontre Seus Medicamentos Rapidamente</h4>
                                    <p>

                                        Está na hora de simplificar o processo de encontrar seus medicamentos. Junte-se à GeoFarma hoje mesmo e descubra como nosso sistema de geolocalização de farmácias pode facilitar sua vida.</p>
                                </div>
                                <div className="icon-box mt-5">
                                    <i className="bx bx-images"></i>
                                    <h4>Busca por medicamentos</h4>
                                    <p> Não deixe que a busca por medicamentos seja uma fonte de estresse. Deixe-nos cuidar disso para você. Clique abaixo para começar sua jornada rumo a um acesso mais fácil e conveniente aos cuidados de saúde.</p>
                                </div>
                                <div className="icon-box mt-5">
                                    <i className="bx bx-shield"></i>
                                    <h4>GeoFarma</h4>
                                    <p>Além disso, estamos comprometidos em oferecer um serviço excepcional, como a capacidade de ver a disponibilidade dos produtos proporcionando uma experiência de usuário sem igual em cada interação.</p>
                                </div>
                            </div>
                            <div className="image col-lg-6 order-1 order-lg-2" style={{ backgroundImage: `url(${H})` }}></div>
                        </div>

                    </div>
                </section>

                <section id="clients" className="clients">
                    <div className="container">

                        <div className="row no-gutters clients-wrap clearfix wow fadeInUp">

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={A1} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={A2} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={Jk} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={Mako} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={A5} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={Lumba} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={A3} className="img-fluid" alt="" />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <div className="client-logo">
                                    <img src={A8} className="img-fluid" alt="" />
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section id="pricing" className="pricing">
                    <div className="container">

                        <div className="section-title">
                            <h2>Produtos</h2>
                            <p>Na busca por saúde e bem-estar, a acessibilidade aos medicamentos certos desempenha um papel crucial. Com nosso inovador sistema de geolocalização de farmácias, estamos tornando mais fácil do que nunca encontrar os medicamentos de que você precisa, exatamente onde você está.</p>
                                <br />
                                <p>Imagine poder localizar a farmácia mais próxima que possui o medicamento específico que você procura, sem esforço. Com nosso sistema intuitivo, você pode fazer exatamente isso. Não importa se é um medicamento de prescrição vital ou um remédio de venda livre para alívio imediato, estamos aqui para conectá-lo com as farmácias que têm o que você precisa, quando você precisa.</p>
                        </div>

                        <div className="row">

                                {Medicamentos1.map((med)=>(
                                    <div className="col-lg-4 col-md-6" key={med.id}>
                                        <div className="box">
                                            <h3>{med.nome}</h3>
                                            <h4><sup>KZ</sup>{med.preco}<span> / desconto</span></h4>
                                            <ul>
                                                <li>{med.tipo}</li>
                                                <li>{med.data_validade}</li>
                                                <li>{med.informacoes}</li>
                                                <li >{med.disponibilidade}</li>
                                                
                                            </ul>
                                            <div className="btn-wrap">
                                                <Link className="btn-buy" to={`/farmacia/ ${med.farmacia_id}`}>Ver Farmacia</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {Medicamentos2.map((med) => (
                                <div className="col-lg-4 col-md-6 mt-4 mt-md-0" key={med.id}>
                                    <div className="box recommended">
                                        <span className="recommended-badge">Recommended</span>
                                        <h3>{med.nome}</h3>
                                        <h4><sup>KZ</sup>{med.preco}<span> / desconto</span></h4>
                                        <ul>
                                            <li>{med.tipo}</li>
                                            <li>{med.data_validade}</li>
                                            <li>{med.informacoes}</li>
                                            <li>{med.disponibilidade}</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <Link className="btn-buy" to={`/farmacia/ ${med.farmacia_id}`} >Ver Farmacia</Link>
                                        </div>
                                    </div>
                                </div>

                               
                            ))}
                                         
                            {Medicamentos3.map((med) => (
                                
                                <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" key={med.id}>
                                    <div className="box">
                                        <h3>{med.nome}</h3>
                                        <h4><sup>KZ</sup>{med.preco}<span> / desconto</span></h4>
                                        <ul>
                                            <li>{med.tipo}</li>
                                            <li>{med.data_validade}</li>
                                            <li>{med.informacoes}</li>
                                            <li>{med.disponibilidade}</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <Link className="btn-buy" to={`/farmacia/ ${med.farmacia_id}`}>Ver Farmacia</Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>

                </section>

                <section id="contact" className="contac">
                    <div className="container">

                        <div className="section-title">
                            <h2>Contactos</h2>
                            <p>Entre em contato conosco para mais informações ou dúvidas.  
                               Estas farmácias estão prontas para atender às suas necessidades de saúde e bem-estar. Não hesite em visitá-las para obter medicamentos e conselhos de profissionais qualificados.</p>
                          
                        </div>
                    </div>

                    <div>
                        <iframe
                            style={{ border: '0', width: '100%', height: '350px' }}
                            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3033152194373!2d13.234166314754993!3d-8.836720595187643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a4a59fcfff531b3%3A0x7e92fcbb31de8f1a!2sLuanda%2C%20Angola!5e0!3m2!1sen!2s!4v1647653080673!5m2!1sen!2s"}
                            frameborder="0"
                            allowfullscreen
                        ></iframe>

                    </div>

                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-4">
                                <div className="info">
                                    <div className="address">
                                        <i className="ri-map-pin-line"></i>
                                        <h4>Localização: </h4>
                                        <p>Vila alice, rua da liberdade</p>
                                    </div>

                                    <div className="email">
                                        <i className="ri-mail-line"></i>
                                        <h4>Email:</h4>
                                        <p>geofarma@gmail.com</p>
                                    </div>

                                    <div className="phone">
                                        <i className="ri-phone-line"></i>
                                        <h4>Ligue:</h4>
                                        <p>+244 935 699 190</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mt-5 mt-lg-0">
                                <form onSubmit={HandleSubmit} className="php-email-form">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <input type="text" name="name" className="form-control" value={dados.nome} onChange={(e) => setDados({...dados, nome: e.target.value})}  id="name" placeholder="Seu nome" required />
                                        </div>
                                        <div className="col-md-6 form-group mt-3 mt-md-0">
                                            <input type="email" className="form-control" value={dados.email} onChange={(e) => setDados({ ...dados, email: e.target.value })} name="email" id="email" placeholder="seu Email" required />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={dados.subject}  onChange={(e) => setDados({ ...dados, subject: e.target.value })} name="subject" id="subject" placeholder="sugestão " required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea className="form-control" value={texto} onChange={(e)=> settexto(e.target.value)} rows="5" placeholder="criticas,apoios, deixe a sua mensagem" required></textarea>
                                    </div>
                                    <div className="my-3" >
                                        { load && (
                                        <div className="loading">Loading</div>)
                                        }
                                        {error && (<div className="error-message"> erro  no email / não pode ser vazio</div>)}
                                        <div className="sent-message">Sua mensagem foi enviada!</div>
                                    </div>
                                    <div className="text-center"><button type="submit">Enviar Menssagem</button></div>
                                </form>

                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <footer id='foote'>
                <div className="container">
                    <h3>GeoFarma</h3>
                    <p>Do básico ao extraordinário, temos tudo o que você precisa para tornar cada momento especial</p>
                    <p>Entre em contato conosco para mais informações ou dúvidas.</p>
                    <div className="social-links">     
                        <Link to={"https://www.facebook.com/profile.php?id=61550441746027"}  target="_blank" className="facebook" style={{fontSize: "2.5rem", margin:"0.5rem"}}><i className="bi bi-facebook"></i></Link>  
                        <Link to={`https://github.com/CEOYURI`} className="github"  target="_blank" style={{ fontSize: "2.5rem", margin: "0.5rem" }}><i className="bi bi-github"></i></Link>                
                        <Link to={"https://www.linkedin.com/in/yuri-joel-76128a2a3"}  target="_blank"className="linkedin" style={{ fontSize: "2.5rem", margin: "0.5rem" }}><i className="bi bi-linkedin"></i></Link>
                        <Link to={"https://www.instagram.com/yurijoel13"} className="instagram"  target="_blank"style={{ fontSize: "2.5rem", margin: "0.5rem" }}><i className="bi bi-instagram"></i></Link>

                    </div>
                    <div className="copyright">
                        &copy; Copyright <strong><span>GeoFarma</span></strong>. Todos os direitos reservados
                    </div>
                    <div className="credits">
                       Desenvolvido por <Link
                       to="https://github.com/CEOYURI"  target="_blank">GeoFarmaCorporation</Link>
                    </div>
                </div>
            </footer>
    
           
        </>
    )
}