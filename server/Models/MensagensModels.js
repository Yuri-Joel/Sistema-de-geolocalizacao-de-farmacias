import  {conn}  from "../utils/conexao.js";

// aqui eu adiciono novas mengens e mostro as mensagens enviadas

export const MostrarMensagens = () => {
const query = "select u.nome, m.mensagem,m.data_envio from mensagens m join usuarios u on m.usuario_id = u.id;";

return new Promise((resolve, reject)=>{
    conn.query(query, (err, data)=>{
        if(err) reject(err);
        else resolve(data)
    })
})
}

export const AddNewsms = (dados)=>{
    const query = "INSERT INTO mensagens(`usuario_id`, `mensagem`) values(?)";
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