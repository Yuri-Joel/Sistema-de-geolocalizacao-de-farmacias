import express from 'express'
import { ActualizarFarma, CRiarFarma, ContaFarma, DeleteFarma, ObterFarmaID, TodasFarma } from '../controllers/FarmaciasControllers.js'


const  routerFa = express.Router()

routerFa.get("/cfarma", ContaFarma )

routerFa.get("/todasfarma", TodasFarma )

routerFa.get("/obterfarma/:id", ObterFarmaID )

routerFa.post("/criarfarma", CRiarFarma )


routerFa.put("/actuafarma/:id", ActualizarFarma )

routerFa.delete("/delfarma/:id", DeleteFarma )

export default routerFa;
