import { conn } from "../../utils/conexao.js"

export const BuscaQualquerMedicamento = (termo, lat, lng, raio)=>{
    const query = `SELECT m.*, f.nome AS farmacia_nome, f.id as farmacia_id,  f.latitude, f.longitude,
    (6371 * acos(cos(radians(${lat})) * cos(radians(f.latitude)) * cos(radians(f.longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(f.latitude)))) AS distancia FROM medicamentos m 
    JOIN farmacia_medicamentos fm On fm.medicamento_id = m.id LEFT JOIN farmacias f ON f.id = fm.farmacia_id
    WHERE m.nome LIKE '%${termo}%'
    OR m.tipo LIKE '%${termo}%'
    OR m.informacoes LIKE '%${termo}%' 
    HAVING distancia <= ${raio} OR distancia > ${raio}  ORDER BY distancia;`

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err)
            else resolve(data)
        })
    })
}


export const BuscaQualquerMedicamentoRealTime = (termo)=>{
    const query = `SELECT 
    m.*, 
    f.nome AS farmacia_nome, 
    f.id AS farmacia_id 
FROM 
    medicamentos m 
LEFT JOIN 
    (
        SELECT 
            fm.medicamento_id,
            f.nome,
            f.id
        FROM 
            farmacia_medicamentos fm 
        JOIN 
            farmacias f ON f.id = fm.farmacia_id
    ) f ON m.id = f.medicamento_id
WHERE 
    (m.nome LIKE '%${termo}%')
    OR (m.tipo LIKE '%${termo}%')
    OR (m.informacoes LIKE '%${termo}%')
GROUP BY
    m.nome limit 6;
`

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err)
            else resolve(data)
        })
    })
}

