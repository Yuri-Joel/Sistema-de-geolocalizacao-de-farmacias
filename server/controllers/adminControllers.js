import { Actualiadmin, Actualizaradminsenha, DeleteAdmin, ObteradminId, TodosAdmin, TornarPrincipal, VerificarAdmin, newadmin } from "../Models/AdministradoresModels.js"
import { EliminarFoto, VerificarSenha } from "../Models/usuarioModels.js"
import { Validateall, Validatepass, hashSenha } from "./usuarioControllers.js"



export const ObterAdmin = async (req,res)=>{
          const {id} = req.params
           const data = await ObteradminId(id)
     res.status(200).json({data})
}

export const TornarAdmin = async(req,res) =>{
    const {id} = req.body;

        const verificarAdmin = await VerificarAdmin(id)

        if(verificarAdmin == true){

            const data = await TornarPrincipal(id,false)
            res.status(200).json({data})
        } 
        else{
            const data = await TornarPrincipal(id,true)
            res.status(200).json({data})
        }
    
}

export const AllAdmin =async (_,res)=>{
    const data = await TodosAdmin()
    res.status(200).json({data})
}

export const CriarAdmin = async (req,res)=> {
    
    const {nome} = req.body;
    const {email} = req.body;
    const {senha} = req.body;
    const validar = Validateall(nome, email,senha, "9348944574")
    
    if(validar){
        const senha2 = await hashSenha(senha);
   
        const values =[
          nome,
          email,
          senha2
      ]; 
      const data = await newadmin(values)
      res.status(200).json({data})
    } else{

        return res.status(200).json({data: "Erro na Actualização"});
    }
    
}


export const Actualizaradmin = async (req,res)=> {
  const {id} = req.params;
  const {nome} = req.body;
  const {email} = req.body;
  
   
    const validar = Validateall(nome,email, "angola2024", "9348484584")
    if(validar){
        const values =[
            nome,
            email,
        ];
        const data = await Actualiadmin(values,id)
   
        res.status(200).json({data})
    } else {
        return res.status(200).json({data: "Erro de autenticação"})
    }
   
}
export const ActualiadminSenha = async (req,res)=>{
    const {id} = req.params;
    const {senhaActual} = req.body;
    const {novaSenha} = req.body;

    const Usuario = await VerificarSenha("Administradores",id)
    
    
    if(Usuario.length > 0){
        const result = await compare(senhaActual, Usuario[0].senha)   
        if(result){

            const validar = await Validatepass(novaSenha)
            if(validar){
            
            const senha = await hashSenha(novaSenha)
            const data = await Actualizaradminsenha(senha,id);
           
            res.status(200).json({data})
              }
              else{
                return res.status(200).json({status: "Senha deve conter 6 caracteres"})
              }
            }else{
                return res.status(200).json({status: "Digite a Senha Actual"})
            }      
    }
    else {
        return res.status(200).json({status: "Credências Invalidas!"})
    }
}

export const  EliminarAdmin =async (req,res)=>{


    const {id}= req.params;

    const data = await DeleteAdmin(id);
    
    res.status(200).json({data})

}

export const deletarFoto = async(req,res)=>{
    const {id}= req.params;

    const data = await EliminarFoto("administradores",id);
    
    res.status(200).json({data})
}