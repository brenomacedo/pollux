import { userFriends } from '@prisma/client'

export const UserFriendView = (userF: userFriends) => {
    return {
        userId: userF.userId,
        userId2: userF.userId2
    }
}