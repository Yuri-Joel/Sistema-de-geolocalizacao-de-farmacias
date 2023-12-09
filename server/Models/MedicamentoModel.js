import { conn } from "../utils/conexao.js";


export const Medicamento = (id) =>{
    const query = " SELECT m.* FROM medicamentos m JOIN farmacia_medicamentos fm ON m.id = fm.medicamento_id WHERE fm.farmacia_id = ?;";

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

export const AddMedicamento = (dados,farmaId)=>{
    const query = "INSERT INTO medicamentos(id,nome, preco, data_validade, informacoes, tipo, imagem_path,disponibilidade) VALUES(?)";

    const q = "INSERT INTO farmacia_medicamentos(farmacia_id,medicamento_id) VALUES(?)";

    return new Promise((resolve,reject)=>{
    conn.query(query,[dados],(err)=>{
        if(err) {
             reject (err)
              }
        else {
            conn.query(q,[farmaId],(err)=>{
                if(err) reject(err);
                else resolve("medicamento adicionado")
            })
        }

    }) })
}

export const ActualizarMedi = (dados, id)=>{
    const query = "UPDATE medicamentos set nome=?, preco= ?, data_validade = ?, informações=?,tipo=?,imagem_path=?, disponibilidade=? where id=?";

    return new Promise ((resolve, reject)=>{
        conn.query(query, [dados,id], (err)=>{
            if(err) reject( err);
            else resolve("Medicamento actualizado")
        })
})
}


export const DisponivelMed = (dispo,id)=>{
    const query = "UPDATE medicamentos SET disponibilidade = ? WHERE id =?;"

    return new Promise ((resolve, reject)=>{
    conn.query(query, [dispo,id], (err)=>{
        if(err) reject( err);
        else resolve("Medicamento actualizado")
    })
})
  
}

export const DeletarMed = (id) =>{
    const query ="DELETE from medicamentos where id =?"

return new Promise ((resolve,reject) =>{
    conn.query(query,[id],(err)=>{
        if(err) reject( err);
        else resolve("Medicamento apagado com sucesso")

    })
})
    
}