
import ReactApexChart from 'react-apexcharts';


export const Grafico = ({data,type, title})=>{

       const options = {
                charts: {
                    type: type,
                },
                title: {
                    text: title,
                },
       } 
       

       return(
        <>
        <div>
      <ReactApexChart options={options} series={data} type={type} height={350} />
       </div>
        </>
       )
}