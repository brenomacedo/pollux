import { userToUser, user } from '@prisma/client'

interface request extends userToUser {
    user_userTouserToUser_userId: user
}

export const RequestView = (request: request) => {
    return {
        status: request.status,
        from: {
            id: request.user_userTouserToUser_userId.id,
            name: request.user_userTouserToUser_userId.name,
            avatar: request.user_userTouserToUser_userId.avatar,
            description: request.user_userTouserToUser_userId.description
        }
    }
}

export const RequestViews = (requests: request[]) => {
    return requests.map(request => {
        return {
            status: request.status,
            from: {
                id: request.user_userTouserToUser_userId.id,
                name: request.user_userTouserToUser_userId.name,
                avatar: request.user_userTouserToUser_userId.avatar,
                description: request.user_userTouserToUser_userId.description
            }
        }
    })
}