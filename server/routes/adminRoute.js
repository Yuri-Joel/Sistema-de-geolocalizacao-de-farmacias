import { Actualizaradmin, CriarAdmin, ObterAdmin, ActualiadminSenha} from "../controllers/adminControllers.js";
import express from 'express';


const routeAdmin = express.Router()

routeAdmin.get("/obtera/:id", ObterAdmin)

routeAdmin.put("/updadmin/:id", Actualizaradmin)
routeAdmin.put("/updadminsenha/:id", ActualiadminSenha)
routeAdmin.post("/newadmin", CriarAdmin)

export default routeAdmin