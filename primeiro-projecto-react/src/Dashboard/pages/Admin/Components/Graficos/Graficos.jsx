import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
export const  Graficos = ()=> {


    const [data, setdata] = useState([])
    const [dataload, setdataload] = useState(false)
    const ListarG = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/grafico/linear`)
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
 ( dataload && 
 <>
     <div className="container">
       <div className="row">
       <BarChart width={600} height={300} data={data}>
    <XAxis dataKey="nome" stroke="#8884d8" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="total" fill="#8884d8" barSize={30} />
  </BarChart>

  <p>Grafico de medicamentos das Farmacias</p>
       </div>
     </div>
 
  </>
  )
  )
}

