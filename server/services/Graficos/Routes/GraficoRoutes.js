import  Express  from "express";
import { Graficofarmacias, GraficofavMedi, Graficofavfarma } from "../Controllers/GraficosControllers.js";


const RouterGrafico = Express.Router()

RouterGrafico.get("/linear", Graficofarmacias)
RouterGrafico.get("/barcharts", GraficofavMedi)
RouterGrafico.get("/areacharts", Graficofavfarma)

export default RouterGrafico;