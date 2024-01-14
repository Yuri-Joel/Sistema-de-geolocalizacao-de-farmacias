import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
 
export const ContarUser = ()=>{
     
 const [users, setusers] = useState(0);

 const CountUsers = async()=> {
  await  axios.get("http://localhost:8800/api/oneuser")
    .then(res => { 

        setusers(res.data.total); 
    })
    .catch(err => toast.error("erro",err))
}

useEffect(()=>{
  CountUsers();
},[])

return(
<>
{users}
</>
)
}

 export const CountFarmacias = ()=>{

  const [Farmacias, setFarmacias] = useState(0)

  const ContarFarma = async()=> {
  await  axios.get("http://localhost:8800/f/cfarma")
    .then(res => {
     // console.log(res.data)
        if(res.data){
          setFarmacias(res.data.total) 
        }
    })
   .catch(erro => toast.error(erro))
  }

    useEffect(()=>{
        ContarFarma();
    },[])

    return(
      <>
      {Farmacias}
      </>
      )   
}

export const CountGestores =  ()=>{
    const [gestores, setgestores] = useState(0);
  
 const ContarGestores = async()=>{
        try {
    const res = await axios.get(`http://localhost:8800/ges/conta`)
       setgestores( res.data.total)
        } catch (error) {
    console.log(error)
}
}

useEffect(()=>{
    ContarGestores();
},[])
    return(
        <>
        {gestores}
        </>
    )


}