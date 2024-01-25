import { Actualizaradmin, CriarAdmin, ObterAdmin, ActualiadminSenha, TornarAdmin, AllAdmin, EliminarAdmin, deletarFoto} from "../controllers/adminControllers.js";
import express from 'express';


const routeAdmin = express.Router()

routeAdmin.get("/todos",AllAdmin)
routeAdmin.get("/obtera/:id", ObterAdmin)


routeAdmin.put("/updadmin/:id", Actualizaradmin)
routeAdmin.put("/updadminsenha/:id", ActualiadminSenha)
routeAdmin.post("/newadmin", CriarAdmin)

routeAdmin.post("/tornar", TornarAdmin)
routeAdmin.delete("/delete/:id",EliminarAdmin)
routeAdmin.delete("/delfoto/:id", deletarFoto )

export default routeAdmin