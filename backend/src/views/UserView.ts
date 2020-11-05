import { user } from '@prisma/client'

const UserView = (user: user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar
    }
}

export default UserView