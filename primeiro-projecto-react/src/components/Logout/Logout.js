import { useNavigate } from "react-router-dom";

export const  Logout = ()=>{

    const Navigate  = useNavigate()

    // Ao fazer logout
const Terminar = ()=>{

    localStorage.removeItem(`usuario`);
    Navigate("/")
}
return(
    <>
   <button onClick={()=> Terminar()}>Terminar Sessão</button>
   </>
)
}

