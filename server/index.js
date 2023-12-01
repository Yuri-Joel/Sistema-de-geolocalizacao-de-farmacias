import express from 'express';

import usuariosControllers from "./routes/usuariosRoutes.js"
import favControllers from "./routes/favoritoRoutes.js"
import SMSRoutes from './routes/mensagensRoutes.js'
import Farma from './routes/farmaciasRoute.js'

const app = express();
const port = 8800;


app.use(express.json())

app.use("/api", usuariosControllers)
app.use("/fav", favControllers)
app.use("/sms", SMSRoutes)
app.use("/f", Farma)
/*
app.get("/", (req, res)=> res.send("HELLO"))*/


app.listen(port , 
    ()=> console.log(`servidor rodando na porta: http://localhost:${port}`))
