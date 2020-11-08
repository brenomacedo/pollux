import e, { request, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
import { RequestView, RequestViews } from '../views/RequestView'
import { UserFriendView } from '../views/UserFriendView'

const prisma = new PrismaClient()

export default {
    async createRequest(req: Request, res: Response) {

        const { userId, userId2 } = req.body
        const data = { userId, userId2 }

        const schema = Yup.object().shape({
            userId: Yup.number().required("Insira o id do remetente!"),
            userId2: Yup.number().required("Insira o id do destinatário!")
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            })
        } catch (e) {
            return res.status(500).json({ errors: e.errors })
        }

        try {
            const request = await prisma.userToUser.create({
                data: {
                    status: "PENDING",
                    user_userTouserToUser_userId: {
                        connect: {
                            id: userId
                        }
                    },
                    user_userTouserToUser_userId2: {
                        connect: {
                            id: userId2
                        }
                    }
                },
                include: {
                    user_userTouserToUser_userId: true
                }
            })

            return res.status(201).json(RequestView(request))
        } catch (e) {
            return res.status(500).json({ errors: ['Solicitação já enviada!'] })
        }

    },

    async answerRequest(req: Request, res: Response) {

        const { userId, userId2 } = req.body
        const data = { userId, userId2 }

        const schema = Yup.object().shape({
            userId: Yup.string().required("Insira o id do rementente"),
            userId2: Yup.string().required("Insira o id do destinatario!")
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            })
        } catch(e) {
            return res.status(500).json({ errors: e.errors })
        }

        let lesser
        let bigger

        if(userId > userId2) {
            lesser = userId2
            bigger = userId
        } else {
            lesser = userId
            bigger = userId2           
        }

        const request = await prisma.userToUser.findMany({
            where: {
                OR: [{
                    userId2: lesser,
                    userId: bigger
                }, {
                    userId2: bigger,
                    userId: lesser
                }]
            }
        })

        if(request.length === 0) {
            return res.status(500).json({ errors: ['Essa solicitação não existe'] })
        }

        request.forEach(async req => {
            await prisma.userToUser.update({
                where: {
                    userToUserIndex: {
                        userId: req.userId,
                        userId2: req.userId2
                    }
                },
                data: {
                    status: "ACCEPTED"
                }
            })
        })

        try {
            const userFriend = await prisma.userFriends.create({
                data: {
                    user_userTouserFriends_userId: {
                        connect: {
                            id: lesser
                        }
                    },
                    user_userTouserFriends_userId2: {
                        connect: {
                            id: bigger
                        }
                    }
                }
            })

            return res.status(201).json(UserFriendView(userFriend))
        } catch(e) {
            return res.status(500).json({ errors: ['Usuários ja são amigos!'] })
        }

    },

    async getRequests(req: Request, res: Response) {

        const { id } = req.params

        const requests = await prisma.userToUser.findMany({
            where: {
                userId2: Number(id)
            },
            include: {
                user_userTouserToUser_userId: true
            }
        })

        return res.status(200).json(RequestViews(requests))

    },

    async deleteRequest(req: Request, res: Response) {

        const { from, to } = req.params

        const data = { from, to }

        const schema = Yup.object().shape({
            from: Yup.number().required('Insira o id do remetente'),
            to: Yup.number().required('Insira o id do destinatário!')
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            })
        } catch(e) {
            return res.status(500).json({ errors: e.errors })
        }

        try {
            await prisma.userToUser.delete({
                where: {
                    userToUserIndex: {
                        userId: Number(from),
                        userId2: Number(to)
                    }
                }
            })

            return res.status(200).json({ message: 'Deletado com sucesso!' })
        } catch(e) {
            return res.status(500).json({ errors: ['Essa solicitação não existe!'] })
        }

    }
}