import { conn } from "../utils/conexao.js";



export const ObteradminId =(gestorId) =>{
    
    const query = "SELECT * FROM administradores where id = ? "
    return new Promise ((resolve,reject )=>{
    conn.query(query,[gestorId], (err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})
}
export const newadmin = (dados)=>{
    const query = "insert into administradores (nome, email,senha) value (?)"
    return new Promise((resolve, reject)=>{

      conn.query(query,[dados], (err)=>{
          if(err)  reject (err);
          else resolve("admin criado com sucesso")
  })
  })
}


export const Actualiadmin = (dados,usuarioId)=>{
    const query = "UPDATE Administradores SET `nome` =?, `email`=?, `senha`=? WHERE `id` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[...dados, usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Actualizado")
        })})

}
