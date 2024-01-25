import { conn } from "../../../utils/conexao.js"



export const GraficoFavMedicamentos = ()=>{

    const query = "SELECT Medicamentos.nome, COUNT(favoritos_medicamentos.id) AS total FROM Medicamentos LEFT JOIN favoritos_medicamentos ON Medicamentos.id = favoritos_medicamentos.medicamento_id GROUP BY Medicamentos.id;"

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err);
            else resolve(data)
        })
    })
}

export const GraficoFavFarmacias = ()=>{

    const query = "SELECT Farmacias.nome, COUNT(favoritos_farmacia.id) AS total FROM Farmacias LEFT JOIN favoritos_farmacia ON Farmacias.id = favoritos_farmacia.farmacia_id GROUP BY Farmacias.id;"

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err);
            else resolve(data)
        })
    })
} 


export const GraficoFarmaciasTotalMedi = ()=>{

    const query = "SELECT farmacias.id  As id, farmacias.nome AS nome, COUNT(medicamentos.id) AS total from farmacias LEFT join farmacia_medicamentos ON farmacias.id = farmacia_medicamentos.farmacia_id LEFT join medicamentos ON medicamentos.id = farmacia_medicamentos.medicamento_id GROUP BY farmacias.id, farmacias.nome;"
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err);
            else resolve(data)
        })
    })
}