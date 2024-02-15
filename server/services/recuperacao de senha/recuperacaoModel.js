
import {conn}  from "../../utils/conexao.js";
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
            else resolve("Actualizada")
        })})

}

export const deleteSenhas = (id) =>{
    const query = 'DELETE FROM recuperacao_senha WHERE id = ?';

    return new Promise ((resolve,reject)=>{
        conn.query(query,[id],(err)=>{
            if(err) reject(err)
            else resolve("recuperacao Feita com Sucesso")
        })})
}


export const VerificarToken = (e)=>{

    const query = " SELECT * FROM recuperacao_senha WHERE token = ? AND expira_em > NOW()";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[e],(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })})
}

export const verEmail = (e)=>{

    const query = " SELECT * FROM recuperacao_senha WHERE id = ? ";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[e],(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })})
}
