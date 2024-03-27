import { conn } from "../../utils/conexao.js";


export const  PesquisarMedicamento = ( usuario,search, idfarma)=>{

  //  const query = `SELECT * from medicamentos  WHERE nome LIKE '%${search}%' ORDER BY id DESC`;
    const query = `SELECT medicamentos.*, favoritos_medicamentos.id AS favorito_id from farmacia_medicamentos  join medicamentos on farmacia_medicamentos.medicamento_id = medicamentos.id LEFT join favoritos_medicamentos on favoritos_medicamentos.medicamento_id = medicamentos.id AND favoritos_medicamentos.usuario_id = ${usuario}  where  farmacia_medicamentos.farmacia_id = ${idfarma} AND medicamentos.nome LIKE "%${search}%" OR 
  medicamentos.tipo LIKE  "%${search}%" OR 
  medicamentos.informacoes LIKE "%${search}%" 
   ;`
   
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err)
            else resolve(data)
        })
    })
}

