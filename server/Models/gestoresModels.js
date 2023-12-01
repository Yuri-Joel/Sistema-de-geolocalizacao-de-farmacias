import { conn } from "../utils/conexao.js";


export const  TodosGestores =()=>{
    const query= "SELECT count(*) FROM gestores"
    return new Promise ((reject, resolve)=>{
    conn.query(query,(err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})

}

export const newGestores = (dados)=>{
    const query = "insert into farmacias (nome,nome_user,email,senha, telefone) value (?)"
    return new Promise((reject,resolve)=>{

      conn.query(query,[dados], (err)=>{
          if(err)  reject (err);
          else resolve("Gestor criada com sucesso")
  })
  })
}