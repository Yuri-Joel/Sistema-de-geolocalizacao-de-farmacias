import express from 'express'
import { Verificação } from './logincontrollers.js';


const routerL = express.Router();

routerL.get("/login/:email/:senha", Verificação)

export default routerL;