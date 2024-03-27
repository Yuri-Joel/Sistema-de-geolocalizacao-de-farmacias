import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs'
//dependecias
import usuarios from "./routes/usuariosRoutes.js"
import fav from "./routes/favoritoRoutes.js"
import SMSRoutes from './routes/mensagensRoutes.js'
import Farma from './routes/farmaciasRoute.js'
import Medi from './routes/medicamentoRoutes.js'
import gestor from './routes/GestoresRoute.js'
import subgestor from './routes/subgestoresRoute.js'
import Admin from './routes/adminRoute.js'
import logactividades from './routes/logactividadesRoute.js'
//services
import login from './services/login/loginroutes.js'
import recuperar from './services/recuperacao de senha/recuperacaoroute.js'
import BuscarMed  from './services/Busca por um Medicamento/BuscaRoutes.js'
import Buscarfarmed from './services/Busca por qualquer Medicamento/BuscaRouterF.js'
import Grafico from './services/Graficos/Routes/GraficoRoutes.js'
import {Tabela} from './utils/Tabelas.js'


import Foto from './upload/foto.js'
import { verificarHorarioFarmacia } from './controllers/FarmaciasControllers.js';
import Estatistica from './services/Estatistica/EstatisticaRoutes.js'
import Notificacao from './routes/NotificacaoRoutes.js'
import { conn } from './utils/conexao.js';
const app = express();
const port = 8800;

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "PUT", "DELETE"],
    
}))
app.use(cookieParser())

app.use("/api", usuarios)
app.use("/fav", fav)
app.use("/sms", SMSRoutes)
app.use(Buscarfarmed)
app.use("/f", Farma)
app.use("/m", Medi)
app.use("/ges", gestor)
app.use("/sub",subgestor)
app.use("/ad", Admin)
app.use("/log",logactividades)
app.use(Estatistica)
app.use(Notificacao)
app.use(Foto)

///services
app.use("/rede", recuperar)
app.use("/l", login)
app.use("/b", BuscarMed)
app.use("/grafico", Grafico)
    
app.use("/upload", express.static('upload'))
app.use("/image_Product", express.static('image_Product'))

Tabela();

// Verificar o horário da farmácia a cada minuto
setInterval(()=> verificarHorarioFarmacia(), 60000);

app.use((_,res)=>{
    res.status(404).send("pagina nao encontrada")
})

app.listen(port ,'0.0.0.0',  
()=> console.log(`servidor rodando na porta: http://localhost:${port}`))

/*

const nomes = [
    "João", "Maria", "Pedro", "Ana", "Lucas", "Carla", "Mateus", "Isabela", "Gustavo", "Aline",
    "Daniel", "Juliana", "Rafael", "Fernanda", "Diego", "Mariana", "Bruno", "Camila", "Thiago", "Laura",
    "Rodrigo", "Natália", "Gabriel", "Larissa", "Guilherme", "Manuela", "Felipe", "Letícia", "Vinícius", "Julia"
];
// Função para gerar e-mails aleatórios
function gerarEmail(nome) {
    const dominio = '@exemplo.com'; // Altere o domínio conforme necessário
    const email = nome.toLowerCase() + dominio;
    return email;
}

// Função para gerar telefones aleatórios
function gerarTelefone() {
    const ddd = '99'; // Exemplo de DDD fictício
    const telefone = ddd + Math.floor(100000000 + Math.random() * 900000000);
    return telefone;
}

// Função para gerar e retornar uma senha criptografada usando bcrypt
async function gerarSenhaCriptografada(nome) {
    const senha = nome; // Usando o nome como senha para este exemplo
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}

// Função para criar e retornar a string SQL de inserção de usuário
async function criarInsertUsuario(nome) {
    const email = gerarEmail(nome);
    const telefone = gerarTelefone();
    const senhaCriptografada = await gerarSenhaCriptografada(nome);

    const query = `INSERT INTO usuarios (nome, email, telefone, senha) VALUES ('${nome}', '${email}', '${telefone}', '${senhaCriptografada}');`;


    return new Promise((resolve, reject) => {
        conn.query(query, (err) => {
            if (err) reject(err)
            else resolve("Horario adicionado")
        })
    });
}

// Função para criar e exibir os comandos SQL de inserção de usuários
async function criarInsertsUsuarios() {
    for (let nome of nomes) {
        const insertSQL = await criarInsertUsuario(nome);
        console.log(insertSQL);
    }
}

// Chamada da função para criar os comandos SQL de inserção de usuários
for (let i = 0; i < 1; i++) {
    
  //  criarInsertsUsuarios();
}
*/