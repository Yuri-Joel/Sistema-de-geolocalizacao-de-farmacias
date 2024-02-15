import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { generatePDF } from '../../../../../PDF/DownloadingPdf';


export const GraficosBarTriangle = ()=>{

  const chartRef = useRef(null)

const [data, setdata] = useState([])
const [dataload, setdataload] = useState(false)
const ListarG = async()=>{
  try {
    const res = await axios.get(`http://localhost:8800/grafico/barcharts`)
      setdata(res.data.data)
      setdataload(true)
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  ListarG();
},[])

function getIntroOfPage(label) {
  if (label) {
    return ' selecionada o medicamento!';
  } 
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Item</p>
      </div>
    );
  }

  return null;
}

return (
  
 ( dataload && 
 <>
 <div className="container">
    <div className="row">
      <div  ref={chartRef}>
    <BarChart width={600} height={300} data={data}>
    <XAxis dataKey="nome"  />
    <YAxis />
    <Tooltip content={<CustomTooltip />}/>
    <Bar dataKey="total" fill="#8884d8" />
  </BarChart> 
 

  <p>Grafico de medicamentos favoritas</p>
  </div>
        <button onClick={() => generatePDF(chartRef, "Grafico de medicamentos favoritas")}>Baixar PDF</button>
    </div>
    </div>
 
  </>
  )
)
}