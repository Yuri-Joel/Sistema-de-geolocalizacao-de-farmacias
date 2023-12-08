import express from 'express'
import { TodosGestores,ContarGestores, CriarGestor, ActualizarGestor, DeletaGestor } from '../controllers/gestoresControllers.js'


const routerG = express.Router()

routerG.get("/todos", TodosGestores)

routerG.get("/todos/:id", ContarGestores)

routerG.post("/cges", CriarGestor)

routerG.put("/actuages/:id", ActualizarGestor)

routerG.delete("/delges/:id", DeletaGestor)

export default routerG;
