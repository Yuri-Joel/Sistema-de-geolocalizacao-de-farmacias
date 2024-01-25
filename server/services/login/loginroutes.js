import express from 'express'
import { Verificacao } from './logincontrollers.js';


const routerL = express.Router();

routerL.post("/login", Verificacao)


export default routerL;