import  Express  from "express";
import { CriarFavFarma, CriarFavMed, DeletaFav, favoritosFarma, favoritosMed } from "../controllers/favoritosControllers.js";

const routerF = Express.Router()

routerF.post("/favoritos-m", CriarFavMed)

routerF.post("/favoritos-f", CriarFavFarma)


routerF.delete("/favoritodel/:id/:tabela", DeletaFav)

routerF.get("/favoritos/:id", favoritosFarma)

routerF.get("/favmedi/:id",favoritosMed)

export default routerF;