import { conn } from "../utils/conexao.js";


export const  ContarFarmacias = ()=>{
    const query ="SELECT count(id) AS total FROM farmacias"
    return new Promise((resolve,reject)=>{

        conn.query(query, (err, result)=>{
            if(err)  reject (err);
            else resolve(result)
    })
    })
}

export const  Todasfarmacias = ()=>{
    const query ="SELECT * FROM farmacias"
    return new Promise((resolve,reject)=>{

        conn.query(query, (err, result)=>{
            if(err)  reject (err);
            else resolve(result)
    })
    })
}
export const  ObterFarmaciaId = (farmaid)=>{
    const query ="SELECT * FROM farmacias where id=?"
    return new Promise((resolve,reject)=>{

        conn.query(query,[farmaid], (err, result)=> {
            if(err)  reject (err);
            else resolve(result)
    })
})
}

export const CriarNewFarmacia = (dados) => {

    const query = "INSERT INTO farmacias (nome,nif,telefone,endereco,latitude,longitude,horario_funcionamento) values (?)"
      return new Promise((resolve,reject)=>{

        conn.query(query,[dados], (err)=>{
            if(err)  reject (err);
            else resolve("Farmacia criada com sucesso")
    })
    })
}

export const ActualizarFarmacias = (dados, id) => {
    const query = "UPDATE farmacias set nome = ?, nif = ?, telefone = ?, endereco = ?, latitude = ?, longitude = ?, horario_funcionamento = ? WHERE id = ?"
    return new Promise((resolve,reject)=>{

        conn.query(query,[dados, id], (err)=>{
            if(err)  reject (err);
            else resolve("Farmacia Actualizada com sucesso")
    })
    })
}

export const DeleteFarmacia = (farmaId)=>{
    const query = "DELETE FROM Farmacias where id =?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[farmaId],(err)=>{
            if(err) reject(err)
            else resolve("Farmacia deletado com sucesso")
        })})

}
