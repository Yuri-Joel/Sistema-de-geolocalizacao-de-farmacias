import express from 'express'
import { CTodosGestores,ContarGestores, CriarGestor, ActualizarGestor, DeletaGestor, ObterGes, Nomefarma, ActualizarGestorSenha, DeletarFotoGestor } from '../controllers/gestoresControllers.js'


const routerG = express.Router()

routerG.get("/conta",  ContarGestores)
routerG.get("/todos", CTodosGestores)
routerG.get("/obtera/:id", ObterGes)
routerG.get("/nome/:id", Nomefarma)

routerG.post("/cges", CriarGestor)

routerG.put("/actuages/:id", ActualizarGestor)
routerG.put("/actuasenha/:id", ActualizarGestorSenha)

routerG.delete("/delges/:id", DeletaGestor)
routerG.delete("/delfoto", DeletarFotoGestor)

export default routerG;
