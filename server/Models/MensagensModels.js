import  {conn}  from "../utils/conexao.js";

// aqui eu adiciono novas mengens e mostro as mensagens enviadas

export const MostrarMensagens = () => {
    const query = `SELECT u.nome, u.foto, u.email, m.id, m.mensagem, m.data_envio, (SELECT COUNT(*) FROM mensagens) AS total FROM mensagens m JOIN usuarios u ON m.usuario_id = u.id 
UNION
SELECT 'Usuário Anônimo' AS nome, 'Null' AS foto, m.email AS email, m.id, m.mensagem, m.data_envio, (SELECT COUNT(*) FROM mensagens) AS total
FROM mensagens m
WHERE m.usuario_id = 0;
 `;

return new Promise((resolve, reject)=>{
    conn.query(query, (err, data)=>{
        if(err) reject(err);
        else resolve(data)
    })
})
}

export const AddNewsms = (dados)=>{
    const query = "INSERT INTO mensagens(`usuario_id`, `mensagem`,`email`) values(?)";
  return  new Promise ((resolve, reject)=>{
        conn.query(query,[dados], (err)=>{
            if(err) reject(err);
            else resolve("Sucess")
        })
    })
}

export const  DeleteMensagens = (mensaId) =>{

    const query = "DELETE FROM mensagens Where `id` = ?";
    return  new Promise ((resolve, reject)=>{
          conn.query(query,[mensaId], (err)=>{
              if(err) reject(err);
              else resolve("mensagem apagada")
          })
      })

}