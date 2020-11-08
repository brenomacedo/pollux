import { user, chatMessages, userToUser, userFriends } from '@prisma/client'
import { MessageView } from './MessageView'
import { RequestView } from './RequestView'

export const UserView = (user: user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar
    }
}

export const UsersView = (users: user[]) => {
    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            avatar: user.avatar
        }
    })
}