import { user, userFriends } from '@prisma/client'

interface userFirendsD extends userFriends {
    user_userTouserFriends_userId2: user
    user_userTouserFriends_userId: user
}

export const UserFriendView = (userF: userFriends) => {
    return {
        userId: userF.userId,
        userId2: userF.userId2
    }
}

export const UserFriendsView = (userF: userFirendsD[], id: number) => {
    return userF.map(f => {

        let friend;

        if(f.user_userTouserFriends_userId.id !== id) {
            friend = f.user_userTouserFriends_userId
        } else {
            friend = f.user_userTouserFriends_userId2
        }

        return {
            friend
        }
    })
}