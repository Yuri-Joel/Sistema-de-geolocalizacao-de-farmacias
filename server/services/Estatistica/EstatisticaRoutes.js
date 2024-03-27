
import express from 'express'
import { GetProvince, getMunicipe, paypalPagament } from './EstatisticaControllers.js'


const RouterE = express.Router()

RouterE.get("/obterprovince", GetProvince)
RouterE.get("/obtermunicipe", getMunicipe)
RouterE.post("/pay", paypalPagament)
export default RouterE;