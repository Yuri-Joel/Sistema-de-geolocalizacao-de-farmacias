import { ActualizarUsuarioId, CriarUsuario, ObterUsuarioId,TodosUsuarios, TodosUsuariosNumeros, VerificarSenha, deleteUsuarios, ActualizarSenhaUser, EliminarFoto} from "../Models/usuarioModels.js";
import bcrypt from 'bcryptjs'
import { VerificarToken, Verify, addrecuperacao } from "../services/recuperacao de senha/recuperacaoModel.js";
import { createTransport } from 'nodemailer';
import {conn} from '../utils/conexao.js'
import axios from 'axios'
export const hashSenha = async (senha)=>{
    
        const saltRounds = 5;
        const v  =  bcrypt.hash(senha, saltRounds)

       return v;
}
export const TodosU = async (_,res)=>{
    const data = await  TodosUsuarios();
    
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
       
        if(validar){
          
            const senha1 = await hashSenha(senha)
          const values = [
            nome,
            telefone,
            email,
            senha1
          ]
          const data = await CriarUsuario(values)
          res.status(200).json({ status: data });
          
          /*    const Confirmar = await ConfirmarEmail(email);
            
             if(Confirmar.message == "Sucess"){
                return res.status(200).json({status: "Sucess", values: {nome, telefone, email, senha1}})
             } else{
                return res.status(200).json({status: "Erro no envio do email"})
             }
     */
        } 
        else{
            return  res.status(200).json({ status: 'Erro! na autenticação' });
        }
      } else {
        return res.status(200).json({ status: 'E-mail Já Existe!' });
      }
   

}

  export const ConfirmarCadastro = async (req, res)=>{
    const {token} = req.body
 
    const values = [
      req.body.nome,
      req.body.telefone,
      req.body.email,
      req.body.senha1 
    ]
    const result = await VerificarToken(token)
    if (!result || result.length === 0) {
      return res.status(200).json({ data: 'Token não encontrado ou expirado!' });
    }

    const token1 = result[0].token;
    if(token == token1){

      const data = await CriarUsuario(values)
        await DeletarConfirmacaoEmail(token)

      return res.status(200).json({data})
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
        const result = await bcrypt.compare(senhaActual, Usuario[0].senha)   
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

export const DeleteFoto = async(req,res)=>{
    
    const {id} = req.params
    const data = await EliminarFoto("usuarios",id)
   
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

  if(telefone.length < 7){

    return false
  }
  
   if (telefone){
     // Exemplo de uso:
     
     const formattedPhoneNumber = await formatPhoneNumber(telefone);
     console.log(formattedPhoneNumber); // Saída: +244935699190
     
      const result = await validatePhoneNumber(formattedPhoneNumber)
       .then(data => {
         if (data){
           console.log('Mensagem:', data.message);
           if (data.message == "This is an Angola valid phone number"){
            return true;
           }
          
         } else {
           console.log('Não foi possível obter os dados.')
           return false;
         }
       })
       .catch(error => {
         console.error('Ocorreu um erro:', error);
         return false
       });
    
  return result
  };
   
 
}
async function validatePhoneNumber(phoneNumber) {
  try {
    const response = await axios.get(`https://angolaapi.onrender.com/api/v1/validate/phone/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('Ocorreu um erro ao fazer a requisição:', error.data);
    return null;
  }
}
async function formatPhoneNumber(number) {
  // Remover todos os caracteres que não sejam dígitos
  const cleanedNumber = number.replace(/\D/g, '');

  // Verificar se o número começa com "244" ou "+244"
  const startsWith244 = /^244/.test(cleanedNumber);
  const startsWithPlus244 = /^\+244/.test(cleanedNumber);

  // Se o número não começar com "244" ou "+244", adicionar "+244" na frente
  let formattedNumber = cleanedNumber;
  if (!startsWith244 && !startsWithPlus244) {
    formattedNumber = '+244' + cleanedNumber;
  }

  return formattedNumber;
}


const DeletarConfirmacaoEmail =async (token)=>{
    const query = 'DELETE FROM recuperacao_senha WHERE token = ?';

    return new Promise ((resolve,reject)=>{
        conn.query(query,[token],(err)=>{
            if(err) reject(err)
            else resolve("Sucesso")
        })})
}
    
  export const ConfirmarEmail = async(email)=>{
    
    const tokenAleatorioCrypto = ()=>  {
      
        return new Promise((resolve, reject) => {
       const seisDigitos = Math.floor(100000 + Math.random()* 900000);
 
       if(seisDigitos){
         resolve(seisDigitos.toString());
       }else{
         reject('erro ao gerar Token')
       }
     })   
     }
 
     const token = await tokenAleatorioCrypto();
     
       const expiraEm = new Date();
      expiraEm.setHours(expiraEm.getHours() + 1)
 
      const dados = [ email, token, expiraEm]
      const AddEmail = await addrecuperacao(dados)
     
      if(AddEmail){
        
     const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: 'ceoyuri23@gmail.com',
          pass: 'cume iuee ojjg qjls',
        },
      });
    
      const mailOptions = {
        to: email,
        subject: 'Confirmação de email Geo Farma Go',
        text: `${token}`,
      };

        
     return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Erro ao enviar o e-mail:", error);
                    reject({ message: 'Erro ao enviar o Pacote', status: error.message });
                } else {
                   
                    resolve({ message: "Sucess", status: `E-mail enviado com sucesso: ${info.response}` });
                }
            });
        });
     
      }else{
        return {message: "Erro no servidor!"}
      }
  }