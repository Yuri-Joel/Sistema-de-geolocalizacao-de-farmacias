import {conn}  from "../utils/conexao.js";


export const Medicamento = (usuario, farma) =>{

   const query = "SELECT medicamentos.*, favoritos_medicamentos.id AS favorito_id from farmacia_medicamentos  join medicamentos on farmacia_medicamentos.medicamento_id = medicamentos.id LEFT join favoritos_medicamentos on favoritos_medicamentos.medicamento_id = medicamentos.id AND favoritos_medicamentos.usuario_id = ? where farmacia_medicamentos.farmacia_id = ?";


    return new Promise((resolve,reject)=>{

        conn.query(query,[usuario,farma],(err, result)=>{
            if(err)  reject (err);
            else resolve(result);
    })
    })
}
export const farmamedicamentos = (farma)=>{

    const query = "SELECT m.* from medicamentos m join farmacia_medicamentos fm on fm.medicamento_id = m.id LEFT JOIN farmacias f on f.id = fm.farmacia_id where f.id = ?; "


    return new Promise((resolve, reject) => {

        conn.query(query, [farma], (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}

export const ObterMedid = (id)=>{

    const query = "SELECT * from medicamentos where id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if (err) reject(err);
            else resolve(data)
        })
    })
}
export const ComparaMedicamentos = (nome) =>{
    const query = "SELECT m.id AS id_med, m.nome  AS nome_medicamento, m.imagem_path, m.disponibilidade ,f.nome AS nome_farmacia, f.id AS id_farma, m.preco FROM  medicamentos m JOIN  farmacia_medicamentos fm ON m.id = fm.medicamento_id JOIN farmacias f ON fm.farmacia_id = f.id WHERE  m.nome = ? ORDER BY m.preco ASC";

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
    const query = "INSERT INTO medicamentos(nome, preco, data_validade, informacoes, tipo, imagem_path,disponibilidade) VALUES(?)";


    const sql = "SELECT LAST_INSERT_ID() as lastId";
    const q = `INSERT INTO farmacia_medicamentos(farmacia_id, medicamento_id) VALUES(${farmaId}, ?)`;

    return new Promise((resolve,reject)=>{

    conn.query(query,[dados],(err)=>{
        if(err) {
             reject (err)
              }
        else {
            
            conn.query(sql,(err, data)=>{
                if(err) reject(err);
                       else{
                    
                    conn.query(q,[ data[0].lastId], (err) => {
                        if (err) reject(err);
                            else resolve("medicamento adicionado")
                    })
                }
            })
        }
        

  


    }) })
}

export const ActualizarMedi = (dados, id)=>{
    const query = "UPDATE medicamentos set nome=?, preco= ?, data_validade = ?, informacoes=?,tipo=?,imagem_path=?, disponibilidade=? where id=?";

    return new Promise ((resolve, reject)=>{
        conn.query(query, [...dados,id], (err)=>{
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

export const totalMedicamento = (id)=>{
    
    const query = "SELECT count(*) as total from medicamentos join farmacia_medicamentos on farmacia_medicamentos.medicamento_id = medicamentos.id left join farmacias on farmacias.id = farmacia_medicamentos.farmacia_id left join gestores on farmacias.id = gestores.farmacia_id where gestores.id = ?;"


    return new Promise ((resolve,reject) =>{
        conn.query(query,[id],(err,data)=>{
            if(err) reject( err);
            else resolve(data)
    
        })
    })

}
export const totalFavoritosMedi = (id)=>{

    const query = "SELECT COUNT(favoritos_medicamentos.id) AS total FROM Medicamentos LEFT JOIN favoritos_medicamentos ON Medicamentos.id = favoritos_medicamentos.medicamento_id Left join farmacia_medicamentos on farmacia_medicamentos.medicamento_id = medicamentos.id left join farmacias on farmacias.id = farmacia_medicamentos.farmacia_id left join gestores on farmacias.id = gestores.farmacia_id where gestores.id = ?;"
    
    return new Promise ((resolve,reject) =>{
        conn.query(query,[id],(err,data)=>{
            if(err) reject( err);
            else resolve(data)
    
        })
    })
}

//Graficos
export const GraficoMedfavoritosFarma = (id) => {

    const query = "SELECT medicamentos.nome, COUNT(favoritos_medicamentos.id) AS total FROM Medicamentos LEFT JOIN favoritos_medicamentos ON Medicamentos.id = favoritos_medicamentos.medicamento_id LEFT JOIN farmacia_medicamentos ON farmacia_medicamentos.medicamento_id = medicamentos.id LEFT JOIN farmacias ON farmacias.id = farmacia_medicamentos.farmacia_id LEFT JOIN gestores ON farmacias.id = gestores.farmacia_id WHERE gestores.id = ? GROUP BY medicamentos.id, medicamentos.nome";

    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if (err) reject(err);
            else resolve(data)

        })
    })
}





