import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
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
import Grafico from './services/Graficos/Routes/GraficoRoutes.js'
import {Tabela} from './utils/Tabelas.js'
import Foto from './upload/foto.js'

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
app.use("/f", Farma)
app.use("/m", Medi)
app.use("/ges", gestor)
app.use("/sub",subgestor)
app.use("/ad", Admin)
app.use("/log",logactividades)

app.use(Foto)

///services
app.use("/rede", recuperar)
app.use("/l", login)
app.use("/b", BuscarMed)
app.use("/grafico", Grafico)
    
app.use("/upload", express.static('upload'))
app.use("/image_Product", express.static('image_Product'))

Tabela();
// app.get("/", (_, res)=> res.send("HELLO"))

app.use((_,res)=>{
    res.status(404).send("pagina nao encontrada")
})

app.listen(port ,'0.0.0.0',  
()=> console.log(`servidor rodando na porta: http://localhost:${port}`))
