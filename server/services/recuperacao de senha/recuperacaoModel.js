
import { conn } from "../../utils/conexao.js";
/// recuperar senha 
export const Verify = (email)=>{
    const query = "SELECT * FROM usuarios WHERE email = ?";

    return new Promise ((resolve, reject)=>{
        conn.query(query,[email],(err, data)=>{
            if(err)  reject (err);
            else resolve(data)
    
        })})
    
}

export const addrecuperacao = (dados)=>{
    const query = "INSERT INTO recuperacao_senha (email, token, expira_em) VALUES (?)"
    return new Promise ((resolve, reject)=>{
        conn.query(query,[dados],(err)=>{
            if(err)  reject (err);
            else resolve("inserido")
    
        })})
}

export const  ActualizarSenha = (dados)=>{
    const query = "UPDATE usuarios SET  `senha`=? WHERE `email` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[...dados],(err)=>{
            if(err) reject(err)
            else resolve("Actualizada senha")
        })})

}

export const deleteSenhas = (email) =>{
    const query = 'DELETE FROM recuperacao_senha WHERE email = ?';

    return new Promise ((resolve,reject)=>{
        conn.query(query,[email],(err)=>{
            if(err) reject(err)
            else resolve("recuperacao eliminada")
        })})
}

export const ver = (e)=>{

    const query = " SELECT * FROM recuperacao_senha WHERE token = ? AND expira_em > NOW()'";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[e],(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })})
}