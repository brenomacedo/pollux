import { userToUser } from '@prisma/client'

export const RequestView = (request: userToUser) => {
    return {
        status: request.status,
        from: request.userId,
        to: request.userId2
    }
}