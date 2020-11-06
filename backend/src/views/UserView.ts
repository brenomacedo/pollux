import { user, chatMessages, userToUser, userFriends } from '@prisma/client'
import { MessageView } from './MessageView'
import { RequestView } from './RequestView'

interface IFriend extends userFriends {
    user_userTouserFriends_userId: user
    user_userTouserFriends_userId2: user
}

interface IUserViewWM extends user{
    chatMessages_chatMessages_destinataryIdTouser: chatMessages[]
    chatMessages_chatMessages_userIdTouser: chatMessages[]
    userToUser_userTouserToUser_userId2: userToUser[]
    userFriends_userTouserFriends_userId2: IFriend[]
    userFriends_userTouserFriends_userId: IFriend[]
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

    const friends1 = user.userFriends_userTouserFriends_userId.map(friend => {
        if(friend.user_userTouserFriends_userId.id !== user.id) {
            return friend.user_userTouserFriends_userId
        }

        return UserView(friend.user_userTouserFriends_userId2)
    })

    const friends2 = user.userFriends_userTouserFriends_userId2.map(friend => {
        if(friend.user_userTouserFriends_userId.id !== user.id) {
            return friend.user_userTouserFriends_userId
        }

        return UserView(friend.user_userTouserFriends_userId2)
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar,
        messages: messages.map(message => MessageView(message)),
        requests: user.userToUser_userTouserToUser_userId2.map(req => {
            return RequestView(req)
        }),
        friends: [...friends1, ...friends2]
    }
}