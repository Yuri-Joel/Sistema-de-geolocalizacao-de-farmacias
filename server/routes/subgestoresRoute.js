import express from 'express'
import { CTodosSubGestores, CriarSubGestor, ActualizarSubGestor, DeletaSubGestor, ContarGestores, ActualizarSubSenha, ObtersubGestorOfGestor, GetSubGestorId } from '../controllers/subgestoresControllers.js'


const routerSubgestor = express.Router()


routerSubgestor.get("/contar/:id", ContarGestores)
routerSubgestor.get("/subtodos", CTodosSubGestores)
routerSubgestor.get("/obtera/:id", GetSubGestorId)
routerSubgestor.get("/subgestor/:id", ObtersubGestorOfGestor)

routerSubgestor.post("/subcges", CriarSubGestor)

routerSubgestor.put("/actuages/:id", ActualizarSubGestor)
routerSubgestor.put("/actuasenha/:id", ActualizarSubSenha)

routerSubgestor.delete("/subdelges/:id", DeletaSubGestor)

export default routerSubgestor;
