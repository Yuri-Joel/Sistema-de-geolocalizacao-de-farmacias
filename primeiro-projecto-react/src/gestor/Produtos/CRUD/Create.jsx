import { useState } from "react"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderGestor } from "../../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../../Dashboard/components/aside/gestor/gestorSide"
import FooterDashboard from "../../../Dashboard/components/footer/footer"
import { Card } from "react-bootstrap"
import { LogActividades } from "../../../Log_Actividades/Log_actividades"
import { handleDateChange } from "../Hooks/Function"
import { api } from "../../../api"

export const CreateProduto = () => {

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
    const [loading, setloading] = useState(false)
    const Navi = useNavigate()
    const farma = localStorage.getItem(`farma`)
    const [Products, setProducts] = useState({
        farma: farma,
        nome: "",
        preco: 0,
        data_validade: "",
        informacoes: "",
        tipo: "",
        imagem: null,
        disponibilidade: "disponivel"

    })
    

    const handleCriarProducts = async (e) => {
        setloading(true)
        e.preventDefault();
        if (!Products.imagem) {
            console.log('Nenhuma imagem selecionada.');
            return;
        };
        const subgestor = localStorage.getItem("subgestor");
        
       const  result = await handleDateChange(Products.data_validade);
        console.log(result)
     if(result)  {
        const formdata = new FormData();
        formdata.append("farma", Products.farma)
        formdata.append("nome", Products.nome)
        formdata.append("preco", Products.preco)
        formdata.append("tipo", Products.tipo)
        formdata.append("data_validade", Products.data_validade)
        formdata.append("informacoes", Products.informacoes)
        formdata.append("image", Products.imagem)
        formdata.append("disponibilidade", Products.disponibilidade)
        formdata.append("subgestor", subgestor)
    
if(Products.preco  && Products.tipo && Products.informacoes && Products.nome){
        try {
            const res = await api.post(`/m/addmed`, formdata)

            if (res.data.data === "medicamento adicionado"){ 
                toast.success(res.data.data)
               Navi("/listarprodutos")
            } else{
                toast.error(res.data.data)
            }
           
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    } else {
        toast.error("ERRO! os campos não podem ser vazios")
    }
    } else {
        toast.error("ERRO na ex 12/12/2024")
    }
        }
    const  [error, setError] = useState('')
    const  [error1, setError1] = useState('')
    const  [error2, setError2] = useState('')
    const handlePriceChange = (event) => {
        const inputPrice = event.target.value;
        // Verifica se o preço contém apenas números e um ponto decimal
        const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!pricePattern.test(inputPrice)) {
          setError('Formato de preço inválido. Use apenas números e um ponto decimal opcional.');
        } else {
          const priceValue = parseFloat(inputPrice);
          if (isNaN(priceValue) || priceValue <= 0) {
           
            setError('O preço deve ser um número maior que zero.');
          } else {
            setError('');
           setProducts({...Products, preco: priceValue.toFixed(2)}); // Formata o preço para ter no máximo duas casas decimais
          }
        }
      };
      const ValidateName = async(event)=>{
       
        const nome = event.target.value
        if(nome.length < 3){
          
            setError1("Pelo menos tres caracteres")
        } else {
            const regexNome = /^[a-zA-Z0-9-ç\s^´`~]+$/;
         if(!regexNome.test(nome)){
            setError1(" Formato invalido. apenas caracteres")
     } else{
        setError1(" ")
        setProducts({...Products, nome: nome})
     }}    
    }

    const ValidateInfo = async(event)=>{
       
        const nome = event.target.value
        if(nome.length < 3){
          
            setError2("Pelo menos tres caracteres")
        } else {
            const regexNome = /^[a-zA-Z0-9-ç`\s^´`~]+$/;
         if(!regexNome.test(nome)){
            setError2(" Formato invalido. apenas caracteres")
     } else{
        setError2(" ")
        setProducts({...Products, informacoes: nome})
     }} 
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
                        <Card  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <form onSubmit={handleCriarProducts} style={{display:'flex',gap:'1rem',flexDirection:'column'}}>
                            <div>
                                <input className="form-control" type="text" required placeholder="nome do medicamento" onChange={(e) => ValidateName(e) } />
                                {error1 && <p style={{ color: 'red' }}>{error1}</p>}
                            </div>
                            <div>
                                    <input className="form-control"  type="text" required placeholder="preco" onChange={(e) =>    handlePriceChange(e)} />
                              {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                            <div>
                                    <input className="form-control" type="text" required placeholder="data de validade" onChange={(e) => setProducts({ ...Products, data_validade: e.target.value })} />
                                  
                            </div>
                            <div>
                        
                            <select className='select-group select-group-left form-control'value={Products.tipo}  onChange={(e)=> setProducts({...Products, tipo: e.target.value})}>

                                        <option value=" " selected> Escolha a Categoria</option>
                                    {
                                    Option.map((opt, index)=>(
                                        <option key={index} value={`${opt}`} >{opt}</option>
                                    ))
                                    }
                             </select>
                            </div>
                            <div>
                                    <textarea className="form-control" required placeholder="informações" onChange={(e) => ValidateInfo(e)} ></textarea>
                                    {error2 && <p style={{ color: 'red' }}>{error2}</p> }
                            </div>
                            <div>
                                    <input className="form-control" type="file" required onChange={(e) => setProducts({...Products, imagem: e.target.files[0]})} />
                            </div>
                            <select className='select-group select-group-left form-control"' value={Products.disponibilidade} onChange={(e) => setProducts({ ...Products, disponibilidade: e.target.value })} >
                                <option value="disponivel" selected>Disponivel</option>
                                <option value="indisponivel">indisponivel</option>
                            </select>
                            <button className="btn btn-sucess" style={{backgroundColor:'#00968c',color:'white'}} type="submit">Cadastrar</button>
                        </form>
                            {(loading &&
                                <div className="loading" id="loading">
                                    <div className="spinner"></div>
                                </div>
                            )}
                        </Card> 
                       
                    </div>
                </div>
              
            </main>
            <FooterDashboard />

        </>
    )
}
