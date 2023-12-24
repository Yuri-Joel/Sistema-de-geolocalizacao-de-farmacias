import { conn } from "../../utils/conexao.js";


export const  PesquisarMedicamento = (search)=>{

    const query = `SELECT * from medicamentos  WHERE nome LIKE '%${search}%' ORDER BY id DESC`;
    
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err);
            else resolve(data)
        })
    })
}