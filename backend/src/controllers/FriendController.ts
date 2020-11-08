import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { UserFriendsView, UserFriendView } from '../views/UserFriendView'

const prisma = new PrismaClient()

export default {
    async getFriends(req: Request, res: Response) {

        const { id } = req.params

        const friends = await prisma.userFriends.findMany({
            where: {
                OR: [
                    {
                        userId: Number(id)
                    },
                    {
                        userId2: Number(id)
                    }
                ]
            },
            include: {
                user_userTouserFriends_userId2: true,
                user_userTouserFriends_userId: true
            }
        })

        return res.status(200).json(UserFriendsView(friends, Number(id)))

    }
}