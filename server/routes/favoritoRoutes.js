import  Express  from "express";
import { CriarFav, DeletaFav, favouritosFarma, favouritosMed } from "../controllers/favoritosControllers.js";

const routerF = Express.Router()

routerF.post("/favoritos", CriarFav)

routerF.delete("/favoritodel/:id", DeletaFav)

routerF.get("/favoritos/:id", favouritosFarma)

routerF.get("/favmedi/:id",favouritosMed)

export default routerF;