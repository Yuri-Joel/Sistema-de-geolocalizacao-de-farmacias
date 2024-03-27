import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { HeaderGestor } from "../../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../../Dashboard/components/footer/footer"
import { LogActividades } from "../../../Log_Actividades/Log_actividades"
import { handleDateChange } from "../Hooks/Function"
import { api } from "../../../api"




export const UpdateProduct = () => {
    const [loading, setloading] = useState(false)
      const Option = [
        "Analgesico",
        "Antibiotico",
        "anti-Inflamatorio",
        "anti-depressivo",
        "anti-alérgico",
        "antipirético",
        "anticoagulante",
          "Antiácido",
          "Anti-hipertensivo",
          "Ansiolítico",
          "Vasodilatador",
          "Corticosteroide"
    ]
    const { id } = useParams()
    const Navigate = useNavigate();

    const subgestor = localStorage.getItem("subgestor");

    const [nome, setnome] = useState('')
    const [preco, setpreco] = useState('')
    const [tipo, settipo] = useState('')
    const [informacoes, setinfo] = useState('')
    const [newImage , setNewImage] = useState(null)
    const [disponibilidade, setdisponibilidade] = useState('')
    const [data_validade, setdata] = useState('')
    const [item, setItem] = useState(0)

    const getProductId = async () => {
        try {
            const res = await api.get(`/m/obtermed/${id}`)
            console.log(res.data.data)
            setItem(res.data.data[0].id)
            setnome(res.data.data[0].nome)
            setpreco(res.data.data[0].preco)
            settipo(res.data.data[0].tipo)
            setinfo(res.data.data[0].informacoes)
            setdata(res.data.data[0].data_validade)
            setdisponibilidade(res.data.data[0].disponibilidade)
           // setimagem(res.data.data[0].imagem_path)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getProductId();
    }, [id])
   
    const handleditarProducts = async (e) => {
        e.preventDefault()

            handleUploadNewImage();
        const subgestor = localStorage.getItem("subgestor");
        const objt = { 
        nome,
        preco,
         tipo,
         data_validade,
         informacoes,
        disponibilidade,
        subgestor,
         produto: item
        }

        const result = await handleDateChange(data_validade);
        setloading(true)
        if(result){
             const Info = await ValidateInfo(informacoes);
            const Name = await ValidateName(nome)
            const Price = await handlePriceChange(preco)
             console.log(Info, Name, Price, tipo);
            if ( Name  && Price  && tipo){
                try {
                    const res = await api.put(`/m/actuamed/${id}`,objt)
                    toast.success(res.data.data)
                    Navigate("/listarprodutos")
                } catch (error) {

                } finally {
                    setloading(false)
                }
    }else{
        toast.warn("Erro, campo vazio ou erro na actualização")
    }
} else{
            toast.error("ERRO na ex 12/12/2024")
}
    }

    
    const handleUploadNewImage = async () => {
        if (!newImage) {
          console.log('Nenhuma imagem selecionada.');
          return;
        }
       
        const formData = new FormData();
       formData.append("image", newImage);
        formData.append('id', id);
        formData.append('subgestor', subgestor)
      
        try {
            const response = await api.post(`/m/uploadmed`,formData);
          console.log(response.data)
          
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
     
    const handlePriceChange = async (inputPrice) => {
        
        // Verifica se o preço contém apenas números e um ponto decimal
        const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!pricePattern.test(inputPrice)) {
           return false
        } else {
            const priceValue = parseFloat(inputPrice);
            if (isNaN(priceValue) || priceValue <= 0) {
               return false;
            } else {    
               setpreco(priceValue.toFixed(2) )// Formata o preço para ter no máximo duas casas decimais
               return true
            }
        }
      
    };
    const ValidateName = async (nome) => {

        if (nome.length < 3) {
            return false
        } else {
            const regexNome = /^[a-zA-Z-ç\s^~´`]+$/;
            if (!regexNome.test(nome)) {
               return false
            } else { 
              setnome(nome)
                return true
            }
        }
     
    }

    const ValidateInfo = async (nome) => {

        
        if (nome.length < 3) {

           return false
        } else {
            const regexNome = /^[a-zA-Z0-9-c\s^~´`]+$/;
            if (!regexNome.test(nome)) {
               return false
            } else {
               
             setinfo( nome )
             return true
            }    
        }
        
    }
    return (
        <>
            <LogActividades tipo={"gestor"} />
            <HeaderGestor />
            <GestorSide />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/gestor'}>Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard/</li>
                        </ol>
                    </nav>
                </div>

                <div className="container">
                    <div className="row">
                      
                        <form onSubmit={handleditarProducts}>
                            <div>
                                <input type="text" value={nome} onChange={(e) => setnome(e.target.value)} />
                               
                            </div>
                            <div>
                                <input type="text" value={preco} onChange={(e) => setpreco(e.target.value)} />
                            </div>
                            <div>
                              
                            <select className='select-group select-group-left form-control'value={tipo}  onChange={(e)=> settipo(e.target.value)}>

                                <option selected value=""> Escolha a Categoria</option>
                                    {
                                    Option.map((opt, index)=>(
                                        <option key={index} value={`${opt}`} >{opt}</option>
                                    ))
                                    }
                             </select>
                            </div>
                            <div>
                                <input value={data_validade} onChange={(e) => setdata(e.target.value)} />
                            </div>
                            <div>
                                <textarea value={informacoes} onChange={(e) => setinfo(e.target.value)} ></textarea>
                            </div>

                            <div>
                                <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                            </div>
                            <select value={disponibilidade} onChange={(e) => setdisponibilidade(e.target.value)} >
                                <option value="disponivel">Disponivel</option>
                                <option value="indisponivel">indisponivel</option>
                            </select>
                            
                            <button className="btn btn-sucess" style={{ backgroundColor: '#00968c', color: 'white' }} type="submit">Actualizar</button>
                        </form>
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

