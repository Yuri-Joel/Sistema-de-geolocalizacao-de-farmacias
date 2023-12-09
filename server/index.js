import express from 'express';

import usuarios from "./routes/usuariosRoutes.js"
import fav from "./routes/favoritoRoutes.js"
import SMSRoutes from './routes/mensagensRoutes.js'
import Farma from './routes/farmaciasRoute.js'
import Medi from './routes/medicamentoRoutes.js'
import gestor from './routes/GestoresRoute.js'
import Admin from './routes/adminRoute.js'
import logactividades from './routes/logactividadesRoute.js'
import login from './services/login/loginroutes.js'
import recuperar from './services/recuperacao de senha/recuperacaoroute.js'

const app = express();
const port = 8800;


app.use(express.json())


app.use("/api", usuarios)
app.use("/fav", fav)
app.use("/sms", SMSRoutes)
app.use("/f", Farma)
app.use("/m", Medi)
app.use("/ges", gestor)
app.use("/ad", Admin)
app.use("/log",logactividades)

///services
app.use("/redes", recuperar)
app.use("/login", login)

// app.get("/", (_, res)=> res.send("HELLO"))

app.use((_,res)=>{
    res.status(404).send("pagina nao encontrada")
})


app.listen(port , 
    ()=> console.log(`servidor rodando na porta: http://localhost:${port}`))
