import { autenticarGestor, autenticarUsuario, autenticarAdmin } from "./login.js";


export const Verificação = async  (req, res)=>{

    const {email} = req.params
    const {senha} = req.params

const usuario = await autenticarUsuario(email, senha);
const gestor = await autenticarGestor(email, senha);
const admin = await autenticarAdmin(email, senha);

if(usuario){
    res.status(200).json(usuario)
    
    return 
}
else if(gestor){
   
    res.status(200).json(gestor)
    return
}
else if(admin){
    
    res.status(200).json(admin)
    return

}


}