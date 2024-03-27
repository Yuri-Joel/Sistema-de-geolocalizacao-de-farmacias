import express from 'express'
import { ObterU,TodosU, DeletaU, ActualizarU, ContarUsuarios, CriarU, ActualizarSenha, DeleteFoto, ConfirmarCadastro} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.get('/usuarioId/:id', ObterU)
router.get('/dados', TodosU)
router.get('/oneuser', ContarUsuarios)

router.post('/cadastro', CriarU)
router.post('/confirmcadastro', ConfirmarCadastro)

router.delete('/deletar/:id', DeletaU)
router.delete('/delfoto/:id', DeleteFoto)
router.put('/actualizar/:id', ActualizarU)
router.put('/actualizarsenha/:id', ActualizarSenha)

router.delete("/delfoto/:id", DeleteFoto)


export default router;
