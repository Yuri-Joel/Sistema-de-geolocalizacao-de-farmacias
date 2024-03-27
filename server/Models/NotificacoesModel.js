import { conn } from "../utils/conexao.js";


export const Notificacao = (dados)=>{

    const query = "INSERT INTO notificacoes(mensagem, tipo) VALUES (?)";

    return new Promise((resolve, reject) => {

        conn.query(query,[dados], (err) => {
            if (err) reject(err);
            else resolve("Notificação Enviada com sucesso")
        })
    })
}


export const NotificacaoSubgestor = (dados)=>{

    const query = "INSERT INTO notificacoes(subgestor_id, medicamento_id, mensagem, tipo) VALUES (?)";

    return new Promise((resolve, reject) => {

        conn.query(query,[dados], (err) => {
            if (err) reject(err);
            else resolve("Notificação Enviada com sucesso para o gestor")
        })
    })
}

export const ObterNotificacaoGestor = (id)=>{

    const query = `SELECT noti.id, noti.mensagem, noti.data_envio, ges.nome as nomeGestores, med.nome AS nome_medicamento, sub.nome  from notificacoes noti LEFT JOIN 
    subgestores sub on sub.id = noti.subgestor_id LEFT JOIN gestores ges ON ges.id = sub.gestor_id LEFT JOIN medicamentos med ON med.id = noti.medicamento_id where noti.tipo = 'gestor' OR ges.id  = ?;`

    return new Promise((resolve, reject) => {

        conn.query(query,[id], (err,data) => {
            if (err) reject(err);
            else resolve(data)
        })
    })
}


export const ObterNotificacao = (tipo)=>{
    const query = "SELECT * FROM notificacoes where tipo = ? ";

    return new Promise((resolve, reject) => {

        conn.query(query,[tipo], (err, data) => {
            if (err) reject(err);
            else resolve(data)
        })
    })
}

export const  DeleteNoti = (id)=>{

    const query = "Delete FROM notificacoes where id = ? ";
    return new Promise((resolve, reject) => {

        conn.query(query,[id], (err) => {
            if (err) reject(err);
            else resolve()
        })
    })
}


export const ShowNotiAdmin = ()=>{
    const query = "SELECT * FROM notificacoes order by tipo";
    return new Promise((resolve, reject) => {

        conn.query(query, (err, data) => {
            if (err) reject(err);
            else resolve(data)
        })
    })

}