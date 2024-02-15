import express from 'express'
import path from 'path'
import multer from 'multer';
import { ActuaMedi, AddMed, ComparaMed, DeleMedi, DispoMed, GraficomedFarma, ObtermedicamentoId, SelMedicamento, TotalFavMedi, TotalMedi, farmaciaMed } from '../controllers/medicamentoControllers.js'



const routermed = express.Router()

routermed.get('/med/:id/:usuario',SelMedicamento);
routermed.get('/farmamed/:id', farmaciaMed)

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



routermed.put("/actuamed/:id", upload.single('image'), ActuaMedi)

routermed.delete("/delmed/:id", DeleMedi)

export default routermed;