import axios from 'axios'
import {useEffect, useRef, useState} from 'react'
import { LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Line } from "recharts";
import { generatePDF } from '../../PDF/DownloadingPdf';
import { LogActividades } from '../../Log_Actividades/Log_actividades';




export  const GraficomedFarma =()=>{

    const chartRef= useRef(null)

    const id = localStorage.getItem("usuario");
    const tipo = 'Grafico de numeros de medicamento'
    
    const [data, setdata] = useState([])
    const [dataload, setdataload] = useState(false)
    const Grafico = async()=>{
        try {
            const res = await axios.get(`http://localhost:8800/m/graficomed/${id}`)
                setdata(res.data.data)
                setdataload(true)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        Grafico();
    },[])


 return(
    <>
     <LogActividades tipo={"gestor"} />  
     { 
        ( dataload  &&  
             <div className="container">
                 <div className="row">
                    <div ref={chartRef}>
                    <LineChart width={800} height={300} data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                         <CartesianGrid strokeDasharray="2 2" />
                     <XAxis dataKey="nome"  interval="preserveStartEnd" />

                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type="monotone" dataKey="total" stroke="#8884d8" />
                     </LineChart>
                     <p>Grafico de numeros de medicamento</p>
                     </div>
                     <button className='btn btn-primary' onClick={()=> generatePDF(chartRef, tipo)}>Baixar PDF</button>
                 </div>
             </div>
         )
         }
     </>
 )   
}