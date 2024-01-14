import  {conn} from "../utils/conexao.js";

export const DeleteFavoritosMed = (usuario, med)=>{
    const query = "DELETE FROM favoritos_medicamentos where usuario_id = ? AND medicamento_id = ?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[usuario, med],(err)=>{
            if(err) reject(err)
            else resolve("Sucess")
        })})

}
export const DeleteFavoritosFarma = (tabela, valor)=>{
    const query = "DELETE FROM ?? where id = ? ";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[tabela,valor],(err)=>{
            if(err) reject(err)
            else resolve("Favorito deletado com sucesso")
        })})

}

export const AddFavoritosMed = (favId)=>{
    const query = "INSERT INTO favoritos_medicamentos(usuario_id, medicamento_id, farmacia_id) VALUES(?)"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[favId],(err)=>{
            if(err) reject(err)
            else resolve("Sucess")
        })})


}
export const AddFavoritosFarma = (favId)=>{
    const query = "INSERT INTO favoritos_farmacia(usuario_id,farmacia_id) VALUES(?)"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[favId],(err)=>{
            if(err) reject(err)
            else resolve("Sucess")
        })})


}

// esta parte é sobre os favouritos buscar , adicionar e deletar
export const favoritosMedId = (usuarioId)=>{
 
    
    const query ="SELECT fav.id AS ide , m.*, f.nome AS nome_farmacia, f.id AS farma FROM favoritos_medicamentos fav JOIN   medicamentos  m ON fav.medicamento_id = m.id LEFT JOIN farmacias f on fav.farmacia_id = f.id WHERE fav.usuario_id = ?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[usuarioId], (err, data)=>{
            if(err)  reject (err);
            else resolve(data)
    
        })})
}

export const favoritosFarmaid = (usuarioId)=> {
   const query ="SELECT fav.id AS ide, f.* FROM favoritos_farmacia fav  JOIN farmacias f ON fav.farmacia_id = f.id WHERE fav.usuario_id = ?"
   return new Promise ((resolve,reject)=>{
    conn.query(query,[usuarioId],(err,result)=>{
        if(err) reject(err)
        else resolve(result)
    })})
    
}
export const VerificarFavoritos = (tabela, coluna, valor, usuario)=>{
    const query ="SELECT * from ?? where ?? = ?  AND usuario_id = ?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[tabela, coluna, valor, usuario],(err,result)=>{
            if(err) reject(err)
            else resolve(result)
        })})

}

