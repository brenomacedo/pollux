import { Router } from 'express'
import FriendRequestController from './controllers/FriendRequestController'
import MessageController from './controllers/MessageController'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/user', UserController.createUser)
routes.post('/user/auth', UserController.authUser)
routes.get('/user/verify', authMiddleware, UserController.verifyToken)
routes.post('/message', MessageController.createMessage)
routes.post('/request', FriendRequestController.createRequest)
routes.post('/friend', FriendRequestController.answerRequest)

export default routes