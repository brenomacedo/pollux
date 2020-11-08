import { Router } from 'express'
import FriendController from './controllers/FriendController'
import FriendRequestController from './controllers/FriendRequestController'
import MessageController from './controllers/MessageController'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/user', UserController.createUser)
routes.post('/user/auth', UserController.authUser)
routes.get('/user/verify', authMiddleware, UserController.verifyToken)
routes.get('/user/search', UserController.searchFriend)
routes.post('/message', MessageController.createMessage)
routes.post('/request', FriendRequestController.createRequest)
routes.get('/request/:id', FriendRequestController.getRequests)
routes.post('/friend', FriendRequestController.answerRequest)
routes.get('/friend/:id', FriendController.getFriends)

export default routes