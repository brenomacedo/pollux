import { Router } from 'express'
import MessageController from './controllers/MessageController'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/user', UserController.createUser)
routes.post('/user/auth', UserController.authUser)
routes.get('/user/verify', authMiddleware, UserController.verifyToken)
routes.post('/message', MessageController.createMessage)

export default routes