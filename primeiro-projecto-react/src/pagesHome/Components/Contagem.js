import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { api } from "../../api";
 
export const ContarUser = ()=>{
     
 const [users, setusers] = useState(0);

 const CountUsers = async()=> {
  await  api.get("/api/oneuser")
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
  await  api.get("/f/cfarma")
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
    const res = await api.get(`/ges/conta`)
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