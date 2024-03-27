import Express  from "express";
import { BuscaMedicamento } from "./BuscaControllers.js";

const routeBuscas =  Express.Router();


routeBuscas.post("/buscar", BuscaMedicamento);

export default routeBuscas;