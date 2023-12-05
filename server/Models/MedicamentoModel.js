import { conn } from "../utils/conexao.js";


export const Medicamento = (id) =>{
    const query = "select m.*, f.nome from medicamentos m join farmacia_medicamentos fm on  m.id = fm.medicamento_id left join farmacias f on fm.farmacia_id = f.id  where f.id = ?;";

    return new Promise((resolve,reject)=>{

        conn.query(query,[id],(err, result)=>{
            if(err)  reject (err);
            else resolve(result)
    })
    })
}

export const AddMedicamento = (mediId,dados, farmaId)=>{
    const query = "INSERT INTO medicamentos(id,nome, preco, data_validade, informações, tipo, imagem_path,disponibilidade) values(?)";

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

export const ComparaMedicamentos = (nome) =>{
    const query = "SELECT m.nome AS nome_medicamento,f.nome AS nome_farmacia, m.preco FROM  medicamentos m JOIN  farmacia_medicamentos fm ON m.id = fm.medicamento_id JOIN farmacias f ON fm.farmacia_id = f.id WHERE  m.nome = ? ORDER BY m.preco ASC";

    // ? 'Ibuprofeno'
    return new Promise((resolve, reject)=>{
        conn.query(query,[nome],(err, data)=>{
            if(err) reject(err);
            else resolve(data)
    })
    })
}

export const DisponivelMed = (valor)=>{
    const query = "Update medicamento set disponibilidade = ?"

    return new Promise ((resolve, reject)=>{
    conn.query(query, [valor], (err)=>{
        if(err) reject( err);
        else resolve("Medicamento actualizado")
    })
})
  
}

export const DeletarMed = (id) =>{
    const query ="DELETE from medicamento where id = ?"
return new Promise ((resolve,reject) =>{
    conn.query(query,[id],(err)=>{
        if(err) reject( err);
        else resolve("Medicamento apagado com sucesso")

    })
})
    
}