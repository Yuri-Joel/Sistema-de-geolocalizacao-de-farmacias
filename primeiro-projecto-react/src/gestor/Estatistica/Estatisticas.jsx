import { useEffect, useRef, useState } from "react"
import { LogActividades } from "../../Log_Actividades/Log_actividades"
import { HeaderGestor } from "../../Dashboard/components/heder/gestor/headerGestor"
import GestorSide from "../../Dashboard/components/aside/gestor/gestorSide"
import { generatePDF } from "../../PDF/DownloadingPdf"
import FooterDashboard from "../../Dashboard/components/footer/footer"
import { api } from "../../api"
import { PaypalPagament } from "./paypal"

export const EstatisticasPesquisas = ()=>{
    const chartRef = useRef(null);

    const tipo = 'Tabela de quantidade de medicamentos pesquisados';
    const idgestor = localStorage.getItem("usuario")
    const [IsPago, setPago]= useState(false)
    const [loaded, setloaded]= useState(false)
    const Pagment =async ()=>{
        try {
            const res = await api.get(`/ges/obtera/${idgestor}`)
            setPago(res.data.data[0].pago)
            console.log(res.data.data[0].pago);
            setloaded(true)
        } catch (error) {
            console.log(error)
        }
    }


const [dados, setdados] = useState([])
  
    const ObterPesquisas = async()=> {
            try {
                const res = await api.get(`/obterprovince`)
                    setdados(res.data.data)
                
            } catch (error) {
               console.log(error)
            }
    }
useEffect(()=>{
    ObterPesquisas();
    Pagment();
}, [])

    return(
        <>
            <HeaderGestor />
            <GestorSide />
            <LogActividades tipo={'gestor'} />
        { loaded && (
        <>
     
          
            <main id='main' className='main'>
        <div className="container">
        <div className="row">
                                {IsPago === "false" ?
                                    <>
      <>
        <div ref={chartRef}>
        <table className="table">
        
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>quantidade de pesquisas</th>
                    <th>Municipio</th>
                    <th>Provincia</th>
                </tr>
            </thead>
            <tbody>
        {
      
        dados.map((data, index)=>(
                <tr key={index}>
                    <td>{data.produto}</td>
                    <td>{data.quantidade_pesquisas}</td>
                    <td>{data.municipio}</td>
                    <td>{data.provincia}</td>
                </tr>
             ))
        }
    </tbody>
    </table>
    </div>

    <button  className='btn btn-primary' onClick={()=> generatePDF(chartRef,tipo )}>Baixar PDF</button>
             </>
          </>
          :
            <>
                <PaypalPagament />
            </>
}

    </div>
    </div>
    </main>    
       
      
       
    
        </>)}
    
    <FooterDashboard />
        </>
    )
       
}