import express from 'express'
import path from 'path'
import multer from 'multer';
import { ActuaMedi, ActualizarImagemMed, AddMed, ComparaMed, DeleMedi, DispoMed, GraficomedFarma, ObtermedicamentoId, SelMedicamento, TotalFavMedi, TotalMedi, farmaciaMed, farmaciaMedTop } from '../controllers/medicamentoControllers.js'



const routermed = express.Router()

routermed.get('/med/:id/:usuario',SelMedicamento);
routermed.get('/farmamed/:id', farmaciaMed)
routermed.get('/meditop', farmaciaMedTop)

routermed.get("/compara/:med", ComparaMed)
routermed.get("/obtermed/:id", ObtermedicamentoId)

routermed.get("/total/:id", TotalMedi)
routermed.get("/totalfav/:id", TotalFavMedi)

routermed.get("/graficomed/:id", GraficomedFarma)

// gestor
routermed.put("/dispomed/:id",DispoMed)


// adicionar um medicamento 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image_Product/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

routermed.post("/addmed",  upload.single('image') ,AddMed)
routermed.post("/uploadmed", upload.single('image'), ActualizarImagemMed)

routermed.put("/actuamed/:id", ActuaMedi);


routermed.delete("/delmed/:id/:subgestor", DeleMedi)

export default routermed;