import { hashSenha } from "../../controllers/usuarioControllers.js";
import { ActualizarSenha, Verify, addrecuperacao, deleteSenhas, ver, verEmail } from "./recuperacaoModel.js";
import { createTransport } from 'nodemailer';


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

    
    const secret = await tokenAleatorioCrypto();
    console.log(secret)
    

    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'E-mail não encontrado' });
      }
    
      const token = secret;
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
          return res.status(500).send(error.message);
        }
        res.status(200).json('E-mail enviado com sucesso: ' + info.response);
      });
}    
    
}

export const  RedefinirSenha = async (req, res)=>{


// Rota para redefinir a senha
  const {token} = req.body
    const valor = await ver(token)

    const result = valor[0].token
    // Verifique no banco de dados se o token está associado ao e-mail do usuário
  
    if (valor.length === 0) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
      }
  
    // Verifique se o token é válido
    if (result === token){
      const { id } = valor[0];
      
      res.setHeader('Content-Type','application/json');
      res.status(200).json({id}) 
    }
   else{
   return res.status(401).json({ message: 'Token inválido' });

   }
   
    
      
      
  
}

export const AdicionadoNovaSenha = async(req, res)=>{
  

  const {id} = req.body
  const {novaSenha}  = req.body;
  const result = await verEmail(id);

  const email = result[0].email;
  const senha = await hashSenha(novaSenha);
  // Atualize a senha no banco de dados
  const values= [senha, email]
  const data = await ActualizarSenha(values)

  // Remova o registro da tabela recuperacao_senha, pois o token foi usado

  const del = await deleteSenhas(id)
  console.log(del)
  res.status(200).json({ message: data });
}