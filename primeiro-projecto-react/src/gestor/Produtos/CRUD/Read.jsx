import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'


export const ReadProdutos = ()=>{

    const [Products, setProducts] = useState([])
  const [load, setload] = useState(false)
    const farma = localStorage.getItem("farma")
    //const Idgestor = localStorage.getItem("usuario")
    
const ListarProdutos = async()=>{

    try {

        const res = await axios.get(`http://localhost:8800/m/farmamed/${farma}`)
            setProducts(res.data.data)
            setload(true)
          
    } catch (error) {

        console.log(error)
        
    }


}
useEffect(()=>{
    ListarProdutos();
},[])

const Eliminar = async (id)=>{

    try {
        const res = await axios.delete(`http://localhost:8800/m/delmed/${id}`)
        toast.success(res.data.data)
        ListarProdutos();
    } catch (error) {
        console.log(error)
    }
}

const Disponivel = async(item, id)=>{
   
const dispo =( item == "disponivel" )? "indisponivel" : "disponivel"

console.log(dispo)
    try {
        const res = await axios.put(`http://localhost:8800/m/dispomed/${id}`,{dispo})
        toast.success(res.data.data)
        ListarProdutos();
    } catch (error) {
        console.log(error)
    }
}
    return(
       
         (  load && <>


            {
                Products.map((item)=>(
                    <div key={item.id}>
                         <h4>{item.nome}</h4>   
                          <div>
                            <img src={`http://localhost:8800/${item.imagem_path}`} />
                         </div>  
                        <p>{item.informacoes}</p>
                        <p>{item.preco}</p>
                        <p>{item.tipo}</p>
                        <p>{item.data_validade}</p>
                        <p>{item.disponibilidade}</p>
                        <Link to={`/editarproduto/${item.id}`}>
                        <button>Editar</button>
                        </Link>
                        <div>
                            <button onClick={() => Disponivel(item.disponibilidade  , item.id)}>Disponibilidade</button>
                           
                        </div>
                        <div>
                            <button onClick={()=> Eliminar(item.id)}>Eliminar</button>
                        </div>
                       


                    </div>

                ))
            }
        </>
        )
       
    )
}