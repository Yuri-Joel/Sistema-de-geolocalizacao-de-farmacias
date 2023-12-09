import { compare } from 'bcrypt';

import {conn} from '../../utils/conexao.js'


// Função para autenticar usuário


export const  autenticarUsuario =(email, senha)=>{
  const queryUsuario = 'SELECT * FROM usuarios WHERE email = ?';

 return new Promise((resolve,reject)=>{
    conn.query(queryUsuario,[email], async(err, results)=>{
        if(err) reject("erro");
        else{
          if(results.length > 0){
            const usuario = results[0];
        const senhaCorrespondente = await compare(senha, usuario.senha);
        if (senhaCorrespondente) {
         resolve('Usuário autenticado com sucesso:', usuario);
        } else {
         reject('Credenciais inválidas. Senha incorreta.');
        }
          }else{
            reject('Credenciais inválidas. Usuário não encontrado.')
          }
        }
    })
  })



}

// Função para autenticar gestores
export function autenticarGestor(email, senha) {
  const query = 'SELECT * FROM gestores WHERE email = ?';

  return new Promise((resolve,reject)=>{
     conn.query(query,[email], async(err, results)=>{
         if(err) reject("erro");
         else{
           if(results.length > 0){
             const gestor = results[0];
         const senhaCorrespondente = await compare(senha, gestor.senha);
         if (senhaCorrespondente) {
          resolve('Usuário autenticado com sucesso:', gestor);
         } else {
          reject('Credenciais inválidas. Senha incorreta.');
         }
           }else{
             reject('Credenciais inválidas. Usuário não encontrado.')
           }
         }
     })
   })
 
}

///exemplo administrador
export function autenticarAdmin(email, senha) {
  const query = 'SELECT * FROM administrador WHERE email = ?';

  return new Promise((resolve,reject)=>{
     conn.query(query,[email], async(err, results)=>{
         if(err) reject("erro");
         else{
           if(results.length > 0){
             const gestor = results[0];
         const senhaCorrespondente = await compare(senha, gestor.senha);
         if (senhaCorrespondente) {
          resolve('Usuário autenticado com sucesso:', gestor);
         } else {
          reject('Credenciais inválidas. Senha incorreta.');
         }
           }else{
             reject('Credenciais inválidas. Usuário não encontrado.')
           }
         }
     })
   })
 
}
