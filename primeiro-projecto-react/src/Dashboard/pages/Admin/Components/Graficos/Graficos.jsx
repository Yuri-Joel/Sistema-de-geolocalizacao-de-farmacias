
import ReactApexChart from 'react-apexcharts';
import {useState} from 'react'


export const Grafico = ({type, title})=>{

       const options = {
                charts: {
                    type: type,
                },
                title: {
                    text: title,
                },
       } 
        const[ series,setseries] = useState([{
  nome: "yuri",
  id: 12,
 }, {
  nome:"carlos",
  id: 14,
 },
{
  nome: "liliana",
  id: 16,
}])

       return(
        <>
        <div>
      <ReactApexChart options={options} series={series} type={type} height={350} />
       </div>
        </>
       )
}