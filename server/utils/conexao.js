import mysql from 'mysql'


    const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "projeto"
}

// Configurações do banco de dados
export const conn = mysql.createConnection(dbConfig) ;
