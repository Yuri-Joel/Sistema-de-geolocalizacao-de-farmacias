import { ActualizarUsuarioId, CriarUsuario, ObterUsuarioId, TodosUsuarios, TodosUsuariosNumeros, VerificarSenha, deleteUsuarios, ActualizarSenhaUser} from "../Models/usuarioModels.js";
import { compare, hash } from "bcrypt";
import { Verify } from "../services/recuperacao de senha/recuperacaoModel.js";

export const hashSenha = async  (senha)=>{
    
        const saltRounds = 5;
      const v  =  hash(senha, saltRounds)

       return v;
   
}


export const TodosU = async (_,res)=>{
    const data = await  TodosUsuarios()
    
        res.status(200).json({data})
   
}

export const ContarUsuarios = async (_,res)=>{
    const data = await TodosUsuariosNumeros()
    const total = data[0].total
    res.status(200).json({total})
      

}

export const ObterU = async (req,res)=>{
          const {id} = req.params
           const data = await ObterUsuarioId(id)
     res.status(200).json({data})
}


export const CriarU = async (req,res)=> {
    const senha = await hashSenha(req.body.senha)
    const {email} = req.body
    const result = await Verify(email)
    
    if (!result || result.length === 0) {
        const values =[
            req.body.nome,
            req.body.telefone,
            email,
            senha
        ];

        const data = await CriarUsuario(values)
        res.status(200).json({status: data})
      }else {
        return res.status(404).json({ status: 'E-mail Já Existe!' });
      }
   

}
export const ActualizarU = async (req,res)=> {
  const {id} = req.params;
  
    const values =[
        req.body.nome,
        req.body.telefone,
        req.body.email,
       
    ];
    const data = await ActualizarUsuarioId(values,id)
   
    res.status(200).json({data})
}

export const ActualizarSenha = async (req,res)=>{
  
    const {id}= req.params
    const {senhaActual} = req.body;
    const {novaSenha} = req.body;

    const Usuario = await VerificarSenha(id)
    
    if(Usuario.length > 0){
        const result = await compare(senhaActual, Usuario[0].senha)

        if(result){
            const senha = hashSenha(novaSenha)
            const data = await ActualizarSenhaUser(senha,id);
        
            res.status(200).json({data})
              
            }else{
                return res.status(401).json({status: "Digite a Senha Actual"})
            }      
    }
    else {
        return res.status(401).json({status: "Credências Invalidas!"})
    }
    
}


export const DeletaU = async (req,res)=> {
    const {id} = req.params
    const data = await deleteUsuarios(id)
   
    res.status(200).json({data})
}

