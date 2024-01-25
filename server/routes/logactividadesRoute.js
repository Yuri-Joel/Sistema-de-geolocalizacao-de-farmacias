import express from "express";
import { criaLog, deletarId, DeletarLog, ObterLogactividades } from "../controllers/LogactividadesControllers.js";

const routeLog = express.Router()

routeLog.post("/lognew", criaLog)

routeLog.get("/log/:admin", ObterLogactividades)

routeLog.delete("/dele/:id", DeletarLog)
routeLog.delete("/del/:id", deletarId)

export  default routeLog;