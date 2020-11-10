import { chatMessages } from '@prisma/client'

export const MessageView = (message: chatMessages) => {
    return {
        id: message.id,
        content: message.content,
        type: message.type,
        userId: message.userId,
        destinataryId: message.destinataryId,
        createdAt: message.createdAt
    }
}

export const MessagesView = (messages: chatMessages[]) => {
    return messages.map(message => {
        return {
            id: message.id,
            content: message.content,
            type: message.type,
            userId: message.userId,
            destinataryId: message.destinataryId,
            createdAt: message.createdAt
        }
    })
}