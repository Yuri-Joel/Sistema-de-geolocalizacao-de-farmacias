import Express  from "express";
import { BuscaMedicamento } from "./BuscaControllers.js";

const routeBuscas =  Express.Router();


routeBuscas.get("/buscar", BuscaMedicamento);

export default routeBuscas;