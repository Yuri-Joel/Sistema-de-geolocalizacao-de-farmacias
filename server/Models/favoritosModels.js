import { conn } from "../utils/conexao.js";

export const DeleteFavoritos = (favId)=>{
    const query = "DELETE FROM favoritos where id =?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[favId],(err)=>{
            if(err) reject(err)
            else resolve("Favorito deletado com sucesso")
        })})

}

export const AddFavoritosMed = (favId)=>{
    const query = "INSERT INTO favoritos(usuario_id, medicamento_id, farmacia_id) value(?)"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[favId],(err)=>{
            if(err) reject(err)
            else resolve("Adicionado como favorito")
        })})


}

// esta parte é sobre os favouritos buscar , adicionar e deletar
export const favoritosMedId = (usuarioId)=>{
    const query ="SELECT u.nome AS nome_usuario, m.*, f.nome AS nome_farmacia FROM favoritos fav JOIN usuarios u ON fav.usuario_id = u.id LEFT JOIN medicamentos m ON fav.medicamento_id = m.id LEFT JOIN farmacias f ON fav.farmacia_id = f.id ";
    
    return new Promise ((resolve,reject)=>{
        conn.query(query,[usuarioId], (err, data)=>{
            if(err)  reject (err);
            else resolve(data)
    
        })})
}

export const favoritosFarmaid = (usuarioId)=> {
   const query ="SELECT f.* FROM favoritos fav  JOIN   farmacias f ON fav.farmacia_id = f.id WHERE fav.usuario_id = ?"
   return new Promise ((resolve,reject)=>{
    conn.query(query,[usuarioId],(err,result)=>{
        if(err) reject(err)
        else resolve(result)
    })})
    
}