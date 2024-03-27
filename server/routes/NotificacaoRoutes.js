import express from 'express'
import { ControlNoti, DeleteNotificacoes, ObterNoti, ObterNotiAdmin, ObterNotiGestor } from '../controllers/NotificacaoControlers.js'



const RouterNoti = express.Router()


RouterNoti.post("/notificacao", ControlNoti)

RouterNoti.get("/notificacao/:tipo", ObterNoti)

RouterNoti.delete("/deletenoti/:id", DeleteNotificacoes)
RouterNoti.get(`/allnotificacoes`, ObterNotiAdmin)

RouterNoti.get("/noti/:id", ObterNotiGestor)


export default RouterNoti;