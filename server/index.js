import express from 'express';

import usuarios from "./routes/usuariosRoutes.js"
import fav from "./routes/favoritoRoutes.js"
import SMSRoutes from './routes/mensagensRoutes.js'
import Farma from './routes/farmaciasRoute.js'
import Medi from './routes/medicamentoRoutes.js'
import gestor from './routes/GestoresRoute.js'
import Admin from './routes/adminRoute.js'

const app = express();
const port = 8800;


app.use(express.json())


app.use("/api", usuarios)
app.use("/fav", fav)
app.use("/sms", SMSRoutes)
app.use("/f", Farma)
app.use("/me", Medi)
app.use("/ges", gestor)
app.use("/ad", Admin)



// app.get("/", (_, res)=> res.send("HELLO"))

app.use((_,res)=>{
    res.status(404).send("page not found")
})


app.listen(port , 
    ()=> console.log(`servidor rodando na porta: http://localhost:${port}`))
