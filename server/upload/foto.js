import path from 'path'
import multer from 'multer';
import express from 'express'
import { UploadFoto, MostrarFoto } from '../upload.js';


const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'upload/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb)=> {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });
const routerFoto = express.Router()

routerFoto.post("/upload", upload.single('image'), UploadFoto )

routerFoto.get("/upload", MostrarFoto)
export  default routerFoto;