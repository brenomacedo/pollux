import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.post('/user', UserController.createUser)
routes.post('/user/auth', UserController.authUser)

export default routes