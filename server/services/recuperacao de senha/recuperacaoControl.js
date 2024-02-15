import { hashSenha } from "../../controllers/usuarioControllers.js";
import { ActualizarSenha, VerificarToken, Verify, addrecuperacao, deleteSenhas, verEmail } from "./recuperacaoModel.js";
import { createTransport } from 'nodemailer';
import {Validatepass} from '../../controllers/usuarioControllers.js'


export const  RecuperaSenha  = async (req, res)=>{

  const {email} = req.body
  const user = await Verify(email)
  
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
    
    if (!user || user.length === 0) {
        return res.status(200).json({ message: 'E-mail não encontrado' });
      }
    
      const expiraEm = new Date();
     expiraEm.setHours(expiraEm.getHours() + 1)

     const values = [email, token, expiraEm]

     const bool = await addrecuperacao(values)
      if(bool){
     const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: 'ceoyuri23@gmail.com',
          pass: 'cume iuee ojjg qjls',
        },
      });
    
      const mailOptions = {
        to: email,
        subject: 'Recuperação de Senha',
        text: `${token}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(200).json({message: 'Erro ao enviar o Pacote', status: error.message});
        }
       return  res.status(200).json({message:"Sucess" , status:`E-mail enviado com sucesso: ${info.response}`});
      });
}    
    
}

export const  RedefinirSenha = async (req, res)=>{

// Rota para redefinir a senha
  const {token} = req.body
  const valor = await VerificarToken(token)

    // Verifique no banco de dados se o token está associado ao e-mail do usuário
    if (valor.length === 0) {
        return res.status(200).json({ message: 'Token inválido ou expirado' });
      }

     
      const result = valor[0].token;
    // Verifique se o token é válido
    if (result == token){
      const { id } = valor[0];
      
      res.setHeader('Content-Type','application/json');
      res.status(200).json({message: "Sucess", id}) 
    }
   else{
   return res.status(200).json({ message: 'Token inválido' });

   }
    
}

export const AdicionadoNovaSenha = async(req, res)=>{
  
  const {id} = req.body
  const {novaSenha} = req.body;
  const result = await verEmail(id);

  const { email } = result[0];

  const validar = await Validatepass(novaSenha)
  if(validar){
  const senha = await hashSenha(novaSenha);
  // Atualize a senha no banco de dados
  const values= [senha, email];

  const data = await ActualizarSenha(values)

  // Remova o registro da tabela recuperacao_senha, pois o token foi usado

  const del = await deleteSenhas(id)
  console.log(del)
  res.status(200).json({ message: data })
}else{
  res.status(200).json({message: "A senha deve conter mais de 6 caracteres"})
}
}