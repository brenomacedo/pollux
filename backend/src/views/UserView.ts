import { user, chatMessages } from '@prisma/client'
import { MessageView } from './MessageView'

interface IUserViewWM extends user{
    chatMessages_chatMessages_destinataryIdTouser: chatMessages[]
    chatMessages_chatMessages_userIdTouser: chatMessages[]
}

export const UserView = (user: user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar
    }
}

export const UserViewWM = (user: IUserViewWM) => {
    const messagesDisordered = [...user.chatMessages_chatMessages_userIdTouser,
        ...user.chatMessages_chatMessages_destinataryIdTouser]
    
    const messages = messagesDisordered.sort((a, b) => a.createdAt - b.createdAt)

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar,
        messages: messages.map(message => MessageView(message))
    }
}