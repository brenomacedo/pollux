import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
import { RequestView } from '../views/RequestView'

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
                }
            })

            return res.status(201).json(RequestView(request))
        } catch (e) {
            return res.status(500).json({ errors: ['Solicitação já enviada!'] })
        }

    },

    async answerRequest(req: Request, res: Response) {

    }
}