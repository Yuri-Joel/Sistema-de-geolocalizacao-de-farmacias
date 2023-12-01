import Express from "express";
import { AddNovasSMS, MostraSMS, DeleteSMS } from "../controllers/mensagensControllers.js";

const routerM = Express.Router()


routerM.get("/mostra", MostraSMS)
routerM.post("/novasms", AddNovasSMS)

routerM.delete("/apagarsms/:id", DeleteSMS)

export default routerM