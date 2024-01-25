import bcrypt from 'bcryptjs';
import {conn} from '../../utils/conexao.js'
//import jwt from 'jsonwebtoken';
import {promisify} from 'util'



export const autenticar = async (email, senha, tabela) => {
 
  //converte a funcao conn.query em uma funcao que retorna promise
    const queryPromise = promisify(conn.query).bind(conn)

     // Consulta SQL genérica para autenticação
  const query = "SELECT * FROM ?? where email = ?";
  try {
    // Verifique a tabela correspondente
    const usuario = await queryPromise(query,[tabela,email]) ;

    if (usuario.length > 0) {
      // Usuário encontrado, verifique a senha usando bcrypt
      const senhaCorreta = await bcrypt.compare(senha, usuario[0].senha);

      if (senhaCorreta) {
        // Senha correta, retorne uma resposta adequada
        const Id = usuario[0].id;
      //  const token = jwt.sign({nome}, "yuri", {expiresIn: '1d'})
        return Id;
      }
    }
    // Se não encontrado na tabela, ou senha incorreta, retorne uma mensagem de erro
    return { erro: 'Credenciais inválidas' };
  } catch (erro) {
    // Trate erros de consulta ou outras exceções
    return { erro: 'Erro durante a autenticação' };
  }
}

export const AdminPrincipal = (id)=>{

    const query = "SELECT administrador_principal from administradores where id = ?";
    return new Promise ((resolve, reject)=>{
      conn.query(query,[id],(err, data)=>{
          if(err)  reject (err);
          else resolve(data)
  
      })}) 

}

export const GestorFarmacia= (id)=>{

  const query ="SELECT f.id, f.nome, g.nome as gestor from farmacias f join gestores g on g.farmacia_id = f.id where g.id = ?;";


  return new Promise((resolve, reject) => {
    conn.query(query, [id], (err, data) => {
      if (err) reject(err);
      else resolve(data)

    })
  }) 

}