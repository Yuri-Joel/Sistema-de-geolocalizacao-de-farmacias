import { conn } from "./conexao.js";


//favoritos Farmacia e medicamentos
const query1 = "CREATE TABLE IF NOT EXISTS favoritos_farmacia( id int NOT NULL AUTO_INCREMENT, `usuario_id` int(11) DEFAULT NULL, `farmacia_id` int(11) DEFAULT NULL, PRIMARY KEY (`id`), KEY `usuario_id` (`usuario_id`), KEY `farmacia_id` (`farmacia_id`) )ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;";

const query2 = " CREATE TABLE IF NOT EXISTS favoritos_medicamentos( id int NOT NULL AUTO_INCREMENT, `usuario_id` int(11) DEFAULT NULL, `medicamento_id` int(11) DEFAULT NULL,`farmacia_id` int(11) DEFAULT NULL, PRIMARY KEY (`id`), KEY `usuario_id` (`usuario_id`), KEY `medicamento_id` (`farmacia_id`),KEY `farmacia_id` (`farmacia_id`) )ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;";


// admin
const query3 = "CREATE TABLE IF NOT EXISTS `administradores` (  `id` int(11) NOT NULL AUTO_INCREMENT,`nome` varchar(255) NOT NULL,`email` varchar(255) NOT NULL,`senha` varchar(255) NOT NULL, `foto` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;"


//farmacias e medicamentos
const query4 = "CREATE TABLE IF NOT EXISTS `farmacias` ( `id` int(11) NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL,`nif` varchar(255) NOT NULL,  `telefone` varchar(50) NOT NULL,`email` varchar(255) not null, `endereco` varchar(255) NOT NULL, `latitude` decimal(10,8) NOT NULL, `longitude` decimal(11,8) NOT NULL, `horario_funcionamento` varchar(100) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;"

const query5 = "CREATE TABLE IF NOT EXISTS `farmacia_medicamentos` ( `id` int(11) NOT NULL AUTO_INCREMENT, `farmacia_id` int(11) DEFAULT NULL,  `medicamento_id` int(11) DEFAULT NULL,  PRIMARY KEY (`id`), KEY `farmacia_id` (`farmacia_id`), KEY `medicamento_id` (`medicamento_id`) ) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;"

const query6 = "CREATE TABLE IF NOT EXISTS `medicamentos` ( `id` int(11) NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, `preco` decimal(10,2) NOT NULL, `data_validade` varchar(255) NOT NULL, `informacoes` text,`tipo` varchar(50) DEFAULT NULL,`imagem_path` varchar(255) DEFAULT NULL,`disponibilidade` enum('disponivel','indisponivel') DEFAULT 'disponivel', PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;"

// Recuperação de Senha
const query7 = "CREATE TABLE IF NOT EXISTS `recuperacao_senha` (`id` int(11) NOT NULL AUTO_INCREMENT,`email` varchar(255) NOT NULL,`token` varchar(255) NOT NULL,`expira_em` timestamp NOT NULL,PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;"

// Mensagens
const query8 = "CREATE TABLE IF NOT EXISTS `mensagens` ( `id` int(11) NOT NULL AUTO_INCREMENT, `usuario_id` int(11) DEFAULT NULL, `farmacia_id` int(20) DEFAULT NULL, `mensagem` text NOT NULL, `data_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`), KEY `usuario_id` (`usuario_id`),  KEY `farmacia_id` (`farmacia_id`)) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;"


//usuarios
const query9 = "CREATE TABLE IF NOT EXISTS `usuarios` ( `id` int(11) NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, `telefone` varchar(255) DEFAULT NULL, `email` varchar(255) NOT NULL, `senha` varchar(255) NOT NULL,  `foto` varchar(255) DEFAULT NULL,PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;"

//log de Actividades

const query10 = "CREATE TABLE IF NOT EXISTS `log_atividades` ( `id` int(11) NOT NULL AUTO_INCREMENT, `tipo_usuario` enum('administrador','usuario','gestor') NOT NULL,`usuario_id` int(11) DEFAULT NULL, `administrador_id` int(11) DEFAULT NULL, `gestor_id` int(11) DEFAULT NULL, `caminho_url` varchar(255) NOT NULL,`data_atividade` timestamp NULL DEFAULT CURRENT_TIMESTAMP,`detalhes` text,PRIMARY KEY (`id`),KEY `usuario_id` (`usuario_id`),KEY `administrador_id` (`administrador_id`), KEY `gestor_id` (`gestor_id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;"


// gestores
const query11 = "CREATE TABLE IF NOT EXISTS `gestores` ( `id` int(11) NOT NULL AUTO_INCREMENT,  `nome` varchar(255) NOT NULL, `nome_user` varchar(255) NOT NULL,  `telefone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `senha` varchar(255) NOT NULL, `farmacia_id` int(11) DEFAULT NULL, `foto` varchar(255) DEFAULT NULL,  PRIMARY KEY (`id`), KEY `farmacia_id` (`farmacia_id`) ) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;"
const  resposta = (query)=>{

   return new Promise ((resolve)=>{
    conn.query(query,(err)=>{
        if(err) resolve(`${err} todas as tabelas já existem`)
        else resolve("Tabela criada com Sucesso")
    })})
}

export const Tabela = async()=>{
    try{
        let  res = await resposta(query1)
        console.log(res)
        res = await resposta(query2)
        console.log(res)
        res = await resposta(query3)
        console.log(res)
        res = await resposta(query5)
        console.log(res)
        res = await resposta(query4)
        console.log(res)
        res = await resposta(query6)
        console.log(res)
        res = await resposta(query7)
        console.log(res)
        res = await resposta(query8)
        console.log(res)
        res = await resposta(query9)
        console.log(res)
        res = await resposta(query10)
        console.log(res)
        res = await resposta(query11)
        console.log(res)
    }catch(error){
        console.log(error)
    }
   
}





