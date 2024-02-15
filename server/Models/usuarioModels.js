import { conn } from "../utils/conexao.js";
import fs from 'fs'


export const TodosUsuarios = ()=>{
    const query = "SELECT * FROM usuarios";
     return new Promise ((resolve,reject )=>{
        conn.query(query, (err, data)=>{
            if(err)  reject(err);
            else resolve(data)
    
        })})
}

export const ObterUsuarioId =(usuarioId) =>{
    
    const query= "SELECT * FROM usuarios where id = ? "
    return new Promise ((resolve,reject )=>{
    conn.query(query,[usuarioId], (err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})
}

export const CriarUsuario = (dados)=>{
    const query = "INSERT INTO usuarios(`nome`,`telefone`, `email`, `senha`) VALUES(?)";
return new Promise ((resolve,reject)=>{
    conn.query(query,[dados],(err)=>{
        if(err) reject(err)
        else resolve("Sucess")
    })
}) 
}

export const deleteUsuarios = (usuarioId)=>{
    const query = "DELETE  FROM usuarios where `id`=?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("usuario deletado com sucesso")
        })})

}

export const ActualizarUsuarioId = (dados,usuarioId)=>{
    const query = "UPDATE usuarios SET `nome` =?, `telefone`=?, `email`=? WHERE `id` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[...dados, usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Actualizado")
        })})

}
export const ActualizarSenhaUser = (dados,usuarioId)=>{
    const query = "UPDATE usuarios SET senha= ? WHERE `id` = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[dados, usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Actualizada")
        })})

}

export const VerificarSenha = ( tabela,usuarioId) => {
    const query = "SELECT * from ?? WHERE id = ?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[tabela, usuarioId],(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })})
}
export const TodosUsuariosNumeros = () =>{
    const query = "SELECT count(id) AS total FROM usuarios"
    return new Promise ((resolve, reject)=>{
    conn.query(query,(err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})

}

export const EliminarFoto =async (tabela,id)=>{

        const RecuperarImage = await recuperarCaminhoImagem(tabela,id);
        console.log(RecuperarImage)
       
        const EliminarFoto = await excluirImagemNoDiretorio(RecuperarImage)
        console.log(EliminarFoto);
    const query = "UPDATE ?? SET `foto` = null  where id = ?";
    return new Promise ((resolve, reject)=>{
        conn.query(query,[tabela,id],(err)=>{
            if(err)  reject (err);
            else resolve("Sucess")
    
        })})

}

const excluirImagemNoDiretorio = async(caminho) => {
    fs.unlink(caminho, (error) => {
        if (error) {
          throw (error);  
        }
       return "eliminado"
    });
};

const recuperarCaminhoImagem = (tabela,id) => {
    const query = 'SELECT foto FROM ?? WHERE id = ?';
   return new Promise((resolve, reject)=>{
    conn.query(query, [tabela,id], (error, results) => {
        if (error)  reject(error)
        else resolve(results[0].foto)
    });
   })
};
