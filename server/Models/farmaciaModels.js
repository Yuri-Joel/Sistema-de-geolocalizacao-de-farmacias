import {conn} from "../utils/conexao.js";


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

export const TodasfarmaciasHome = () => {
    const query = "SELECT f.*,  COUNT(favoritos_farmacia.id) AS total FROM farmacias f  LEFT JOIN favoritos_farmacia ON f.id = favoritos_farmacia.farmacia_id GROUP BY f.id ORDER BY RAND()  limit 6"
    return new Promise((resolve, reject) => {

        conn.query(query, (err, result) => {
            if (err) reject(err);
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
 
    const query = "INSERT INTO farmacias (nome,nif,telefone,email,endereco,latitude,longitude) VALUES (?)"
      return new Promise((resolve,reject)=>{

        conn.query(query,[dados], (err)=>{
            if(err)  reject (err);
            else resolve("Sucess")
    })
    })
}

export const ActualizarFarmacias = (dados, id) => {
    const query = "UPDATE farmacias SET  `nome`=? , `nif`=? ,`email`= ?, `telefone`=?  WHERE `id` =?;"
    return new Promise((resolve,reject)=>{

        conn.query(query,[...dados, id], (err)=>{
            if(err)  reject (err);
            else resolve("Farmacia Actualizada com sucesso")
    })
    })
}

export const ActualizarFarmaciaAdmin = (dados, id)=> {

    const query = "UPDATE farmacias SET   `endereco`=?,`latitude`=? , `longitude`=?  WHERE `id` =?;"
    return new Promise((resolve, reject) => {

        conn.query(query, [...dados, id], (err) => {
            if (err) reject(err);
            else resolve("Farmacia Actualizada com sucesso")
        })
    })
}


export const FarmaciaAberta = (value, id)=> {
    const query = "UPDATE farmacias SET  `aberto`= ?  WHERE `id` =?;"
    return new Promise((resolve, reject) => {
        conn.query(query, [value, id], (err) => {
            if (err) reject(err)
            else resolve("Farmacia")
        })
    })
}
export const DeleteFarmacia = (farmaId)=>{
    const query = "DELETE FROM farmacias where id =?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[farmaId],(err)=>{
            if(err) reject(err)
            else resolve("Farmacia deletado com sucesso")
        })})

}

export const UpdateHorario = (horaA, horaF, id)=>{

    const query = "UPDATE farmacias SET `horaAbertura`= ?, `horaFechamento`= ?  WHERE `id` =?;";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[horaA, horaF, id],(err)=>{
            if(err) reject(err)
            else resolve("Horario adicionado")
        })})
}

export const  Buscarhora = async()=>{
    const query = "SELECT id,nome,horaAbertura, horaFechamento FROM farmacias"

    return new Promise((resolve, reject) => {

        conn.query(query, (err, data) => {
            if (err) reject(err);
            else resolve(data)
        })
    })
}