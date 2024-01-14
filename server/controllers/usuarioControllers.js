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
   const {senha} = req.body
    const {email} = req.body
    const {nome} = req.body
    const {telefone} = req.body
    
    const result = await Verify(email)
    
    if (!result || result.length === 0) {
      

        const validar = await Validateall(nome,email,senha,telefone);
        console.log(validar)
        if(validar){
            const senha1 = await hashSenha(senha)
            const values =[
                nome,
                telefone,
                email,
                senha1
             ];
        const data = await CriarUsuario(values)
        res.status(200).json({status: data})
        } 
        else{
            return  res.status(200).json({ status: 'Erro! na autenticação' });
        }
      } else {
        return res.status(200).json({ status: 'E-mail Já Existe!' });
      }
   

}
export const ActualizarU = async (req,res)=> {
  const {id} = req.params;
  const {email} = req.body
  const {nome} = req.body
  const {telefone} = req.body
 
  
  const values =[
    nome,
    telefone,
    email,
 ];
    
    const validar = await Validateall(nome,email,"angola2024",telefone);
    if(validar) {
    const data = await ActualizarUsuarioId(values,id)
   
    res.status(200).json({data})
} else{
    return res.status(200).json({ status: 'Erro nos valores da input!' });
}
}

export const ActualizarSenha = async (req,res)=>{
  
    const {id}= req.params
    const {senhaActual} = req.body;
    const {novaSenha} = req.body;

    const Usuario = await VerificarSenha("usuarios",id)
    
    
    if(Usuario.length > 0){
        const result = await compare(senhaActual, Usuario[0].senha)   
        if(result){

            const validar = await Validatepass(novaSenha)
            if(validar){
            
                const senha = await hashSenha(novaSenha)
            const data = await ActualizarSenhaUser(senha,id);
           
            res.status(200).json({data})
              }else{
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


export const DeletaU = async (req,res)=> {
    const {id} = req.params
    const data = await deleteUsuarios(id)
   
    res.status(200).json({data})
}

//funcao para validar nome, email, telefone e senha

export const Validateall = async(nome,email,senha,telefone)=> {

    const isName = await ValidateName(nome);
    console.log(isName)
    const isPass = await Validatepass(senha);
    console.log(isPass)
    const isNumber = await ValidateNumber(telefone)
    console.log(isNumber)
    const isEmail = await ValidateEmail(email);
    console.log(isEmail);
    

    return  isNumber && isName && isPass && isEmail
}


export const ValidateName = async(nome)=>{
    if(nome.length < 3){
      
        return false;
    }
    const regexNome = /^[a-zA-Z\s]+$/;

    return regexNome.test(nome);
    
}
export const ValidateEmail = async(email)=>{ 
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-z]{2,6}$/i;

    return regex.test(email)
}

export const Validatepass = async(senha)=>{
    if(senha.length < 6){
        return false
    }
    return true;
}
export const ValidateNumber = async(telefone)=>{
   
    const regexTelefone = /^[0-9\-]+$/;
    return regexTelefone.test(telefone);
   
}

  // Função de validação de senha
  /*
  const validarSenha = (senha) => {
    // Pelo menos 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regexSenha.test(senha);
  };
  */
  