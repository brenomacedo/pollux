import { Router } from 'express'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/user', UserController.createUser)
routes.post('/user/auth', UserController.authUser)
routes.get('/user/verify', authMiddleware, UserController.verifyToken)

export default routes