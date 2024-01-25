import {conn} from "../utils/conexao.js";


export const TodosAdmin = ()=>{
   
    const query = "SELECT * FROM administradores where id != 4";
    return new Promise ((resolve,reject )=>{
        conn.query(query, (err, data)=>{
            if(err)  reject (err);
            else resolve(data)
    
        })})
}

export const TornarPrincipal = (id, valor)=>{

    const query = "UPDATE administradores set Administrador_principal = ? where id = ?";

    return new Promise ((resolve,reject )=>{
        conn.query(query,[valor,id], (err)=>{
            if(err)  reject (err);
            else resolve("Sucess")
    
        })})
}

export const VerificarAdmin = (id)=>{

    const query = "SELECT Administrador_principal from administradores where id = ?"
     return new Promise ((resolve,reject )=>{
        conn.query(query,[id], (err,data)=>{
            if(err)  reject (err);
            else resolve(data)
    
        })})
}




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
          else resolve("Sucess")
  })
  })
}


export const Actualiadmin = (dados,usuarioId)=>{
    const query = "UPDATE Administradores SET `nome` =?, `email`=? WHERE `id` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[...dados, usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Actualizado")
        })})

}
export const Actualizaradminsenha = (dados,usuarioId)=>{
    const query = "UPDATE Administradores SET ? `senha`= ? WHERE `id` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[dados, usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Actualizado")
        })})

}

export const DeleteAdmin  = (id)=>{

    const query = "DELETE FROM Administradores where id = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[id],(err)=>{
            if(err) reject(err)
            else resolve("Sucess")
        })})
}