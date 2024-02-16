import { useEffect, useRef, useState } from "react";
import { AreaChart, XAxis, YAxis, Tooltip, Area,CartesianGrid } from "recharts";          
import axios from 'axios'          
import { generatePDF } from "../../../../../PDF/DownloadingPdf";

export const GraficosAreChart = ()=>{

const chartRef = useRef(null)
  const [data, setdata] = useState([])
  const [dataload, setdataload] = useState(false)
  const ListarG = async()=>{
    try {
      const res = await axios.get(`http://localhost:8800/grafico/areacharts`)
        setdata(res.data.data)
        setdataload(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    ListarG();
  },[])

return(

(  dataload &&   
  <>
   <div className="container">
    <div className="row">
      <div ref={chartRef}>
    <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="nome" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {/* <Area type="monotone" dataKey="id" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
        <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      </div>
      <p>Grafico de favoritos das Farmacias</p>
        <button className='btn btn-primary' onClick={() => generatePDF(chartRef, "Grafico de favoritos das Farmacias")}>Baixar PDF</button>
    </div>
   </div>
  
      </>
)
)}