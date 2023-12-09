import express from 'express'
import { CTodosGestores,ContarGestores, CriarGestor, ActualizarGestor, DeletaGestor, ObterGes } from '../controllers/gestoresControllers.js'


const routerG = express.Router()

routerG.get("/conta",  ContarGestores)
routerG.get("/todos", CTodosGestores)
routerG.get("/todos/:id", ObterGes)

routerG.post("/cges", CriarGestor)

routerG.put("/actuages/:id", ActualizarGestor)

routerG.delete("/delges/:id", DeletaGestor)

export default routerG;
