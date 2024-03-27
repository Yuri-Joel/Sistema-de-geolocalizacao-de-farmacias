import express from 'express'
import { searchMedicamento, searchMedicamentoRealTime } from './BuscaControllers.js'

const routerB = express.Router()

routerB.post("/buscarfarma", searchMedicamento)

routerB.post("/realtime", searchMedicamentoRealTime)
export default routerB;