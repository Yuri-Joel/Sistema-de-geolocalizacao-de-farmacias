import Express  from "express";
import { BuscaMedicamento } from "./BuscaControllers.js";

const routeBuscas =  Express.Router();


routeBuscas.get("/buscar/:search/:usuario/:idfarma", BuscaMedicamento);

export default routeBuscas;