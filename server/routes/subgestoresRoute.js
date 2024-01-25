import express from 'express'
import { CTodosSubGestores, CriarSubGestor, ActualizarSubGestor, DeletaSubGestor, ObterSubGes, ContarGestores, ObtersubGestor } from '../controllers/subgestoresControllers.js'


const routerSubgestor = express.Router()


routerSubgestor.get("/contar/:id", ContarGestores)
routerSubgestor.get("/subtodos", CTodosSubGestores)
routerSubgestor.get("/subtodos/:id", ObterSubGes)
routerSubgestor.get("/subgestor/:id", ObtersubGestor)

routerSubgestor.post("/subcges", CriarSubGestor)

routerSubgestor.put("/subactuages/:id", ActualizarSubGestor)

routerSubgestor.delete("/subdelges/:id", DeletaSubGestor)

export default routerSubgestor;
