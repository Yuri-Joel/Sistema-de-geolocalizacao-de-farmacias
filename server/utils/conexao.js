import mysql from 'mysql'


    const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "projeto"
}

// Configurações do banco de dados
export const conn = mysql.createConnection(dbConfig) ;

/*
// Função para conectar ao banco de dados
const connectToDatabase = () => {
 
  conn.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err.message);
      // Tente reconectar a cada 5 segundos
      setTimeout(()=>{
        connectToDatabase()
      },5000);
    } else {
      console.log('Conectado ao MySQL');
    }
  });

  // Adicionando manipulador de erro global para evitar que o aplicativo seja encerrado por erros não tratados.
  conn.on('error', (err) => {
    console.error('Erro no MySQL:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconectar caso a conexão seja perdida
      connectToDatabase();
    } else {
      throw err;
    }
  });
};

// Chame a função de conexão
connectToDatabase();
*/