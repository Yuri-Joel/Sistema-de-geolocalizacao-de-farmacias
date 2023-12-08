import express from "express";
import { criaLog, ObterLogactividades } from "../controllers/LogactividadesControllers";

const routeLog = express.Router()

routeLog.post("/lognew", criaLog)

routeLog.get("log/:id", ObterLogactividades)

export  default routeLog;