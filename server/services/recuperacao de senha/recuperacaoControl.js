import { ActualizarSenha, Verify, addrecuperacao, deleteSenhas, ver } from "./recuperacaoModel.js";
import { createTransport } from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const  RecuperaSenha  = async (req, res)=>{

    const tokenAleatorioCrypto = ()=>  {
      
       return new Promise((resolve, reject) => {
        crypto.randomBytes(10,(erro, buffer)=>{
          if(erro)reject(erro)
          else{
        const token = buffer.toString('hex');
        resolve(token)
      }
        })  })   
    }

    const secret = await tokenAleatorioCrypto();
   
    const {email} = req.body
    const user = await Verify(email)

    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'E-mail não encontrado' });
      }
    
      const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
      const expiraEm = new Date();
     expiraEm.setHours(expiraEm.getHours() + 1)

     const values = [email, token, expiraEm]

     const bool = await addrecuperacao(values)
      if(bool)
{
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
        text: `Clique no link para redefinir sua senha: http://localhost:8800/rede/redefinir-senha/${token}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        }
        res.status(200).json('E-mail enviado com sucesso: ' + info.response);
      });
}    
    
}

export const  RedefinirSenha = async (req, res)=>{

// Rota para redefinir a senha

    const { token } = req.params;
    const { novaSenha } = req.body;
  
    const valor = await ver(token)

    const result = valor[0].token
    // Verifique no banco de dados se o token está associado ao e-mail do usuário
    
    if (result.length === 0) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
      }
  
    // Verifique se o token é válido
    jwt.verify(token,result, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    
      const { email } = decoded;
  
      // Atualize a senha no banco de dados
      const values= [novaSenha,email ]
      const data = await ActualizarSenha(values)
  
      // Remova o registro da tabela recuperacao_senha, pois o token foi usado

      const del = await deleteSenhas(email)
     
      res.status(200).json({ message: data + del });
    });
  
}