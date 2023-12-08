import { conn } from "../utils/conexao.js";


export const Medicamento = (id) =>{
    const query = "select m.*, f.nome AS nome_farmacia from medicamentos m join farmacia_medicamentos fm on  m.id = fm.medicamento_id left join farmacias f on fm.farmacia_id = f.id  where f.id = ?;";

    return new Promise((resolve,reject)=>{

        conn.query(query,[id],(err, result)=>{
            if(err)  reject (err);
            else resolve(result)
    })
    })
}


export const ComparaMedicamentos = (nome) =>{
    const query = "SELECT m.nome AS nome_medicamento,f.nome AS nome_farmacia, m.preco FROM  medicamentos m JOIN  farmacia_medicamentos fm ON m.id = fm.medicamento_id JOIN farmacias f ON fm.farmacia_id = f.id WHERE  m.id = ? ORDER BY m.preco ASC";

    // ? 'Ibuprofeno'
    return new Promise((resolve, reject)=>{
        conn.query(query,[nome],(err, data)=>{
            if(err) reject(err);
            else resolve(data)
    })
    })
}

//// do lado do gestor

export const AddMedicamento = (mediId,dados, farmaId)=>{
    const query = "INSERT INTO medicamentos(id,nome, preco, data_validade, informacoes, tipo, imagem_path,disponibilidade) values(?)";

    const q = "INSERT INTO farmacia_medicamentos(farmacia_id, medicamento_id) values(?)";

    return new Promise((resolve,reject)=>{
    conn.query(query,[mediId,dados],(err)=>{
        if(err) {
             reject (err)
              }
        else {
            conn.query(q,[farmaId, mediId],(err)=>{
                if(err) reject(err);
                else resolve("medicamento adicionado")
            })
        }

    }) })
}

export const ActualizarMedi = (dados, id)=>{
    const query = "UPDATE medicamento set nome=?, preco= ?, data_validade = ?, informações=?,tipo=?,imagem_path=?, disponibilidade=? where id=?";

    return new Promise ((resolve, reject)=>{
        conn.query(query, [dados,id], (err)=>{
            if(err) reject( err);
            else resolve("Medicamento actualizado")
        })
})
}


export const DisponivelMed = (valor,id)=>{
    const query = "Update medicamento set disponibilidade = ? where id =?"

    return new Promise ((resolve, reject)=>{
    conn.query(query, [valor,id], (err)=>{
        if(err) reject( err);
        else resolve("Medicamento actualizado")
    })
})
  
}

export const DeletarMed = (id) =>{
    const query ="DELETE from medicamento where id =?"

return new Promise ((resolve,reject) =>{
    conn.query(query,[id],(err)=>{
        if(err) reject( err);
        else resolve("Medicamento apagado com sucesso")

    })
})
    
}