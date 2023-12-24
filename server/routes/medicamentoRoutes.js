import express from 'express'
import { ActuaMedi, AddMed, ComparaMed, DeleMedi, DispoMed, SelMedicamento } from '../controllers/medicamentoControllers.js'

const routermed = express.Router()

routermed.get('/med/:id',SelMedicamento)

routermed.get("/compara", ComparaMed)


// gestor
routermed.put("/dispomed/:id",DispoMed)

routermed.post("/addmed",AddMed)

routermed.put("/actuamed/:id",ActuaMedi)

routermed.delete("/delmed/:id", DeleMedi)

export default routermed;