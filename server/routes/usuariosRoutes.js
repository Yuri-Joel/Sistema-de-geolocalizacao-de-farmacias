import express from 'express'
import {CriarU, ObterU,TodosU, DeletaU, ActualizarU, ContarUsuarios} from '../controllers/usuarioControllers.js'

const router = express.Router()


router.get('/usuarioId/:id', ObterU)
router.get('/dados', TodosU)
router.get('/oneuser', ContarUsuarios)

router.post('/cadastro', CriarU)

router.delete('/deletar/:id', DeletaU)
router.put('/actualizar/:id', ActualizarU)
/*
router.put("/:id", UpdateUser)
router.post("/", addUser)
router.delete("/:id", DeleteUser)*/

export default router;
