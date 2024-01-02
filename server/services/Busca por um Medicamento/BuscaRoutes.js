import Express  from "express";
import { BuscaMedicamento } from "./BuscaControllers.js";

const routeBuscas =  Express.Router();


routeBuscas.get("/buscar/:search", BuscaMedicamento);

export default routeBuscas;