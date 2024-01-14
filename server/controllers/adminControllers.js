import { Actualiadmin, Actualiadminsenha, ObteradminId, newadmin } from "../Models/AdministradoresModels.js"
import { VerificarSenha } from "../Models/usuarioModels.js"
import { Validateall, Validatepass, hashSenha } from "./usuarioControllers.js"



export const ObterAdmin = async (req,res)=>{
          const {id} = req.params
           const data = await ObteradminId(id)
     res.status(200).json({data})
}


export const CriarAdmin = async (req,res)=> {
    const senha = await hashSenha( req.body.senha);
    const values =[
        req.body.nome,
        req.body.email,
        senha,
        
    ];

    const data = await newadmin(values)
    res.status(200).json({data})
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
            const data = await Actualiadmin(senha,id);
           
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