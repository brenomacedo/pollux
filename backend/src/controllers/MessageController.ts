import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { MessagesView, MessageView } from '../views/MessageView'
import * as Yup from 'yup'

const prisma = new PrismaClient()

export default {
    async createMessage(req: Request, res: Response) {
        
        const { content, type, userId, destinataryId } = req.body
        const data = { content, type, userId, destinataryId }

        const schema = Yup.object().shape({
            content: Yup.string().required('Mensagem nula!'),
            type: Yup.string().equals(["MESSAGE", "IMAGE"]).required(),
            userId: Yup.number().required("Id inválido!"),
            destinataryId: Yup.number().required("Id do destinatário invalido!")
        })

        try {
            await schema.validate(data , {
                abortEarly: false
            })
        } catch (e) {
            return res.status(500).json({ errors: e.errors })
        }

        try {
            const message = await prisma.chatMessages.create({
                data: {
                    content, type, createdAt: Number(Date.now()), user_chatMessages_destinataryIdTouser: {
                        connect: {
                            id: destinataryId
                        }
                    },
                    user_chatMessages_userIdTouser: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })

            return res.status(201).json(MessageView(message))
        } catch (e) {
            return res.status(500).json({ errors: ['Não foi possível enviar sua mensagem'] })
        }

    },

    async getMessages(req: Request, res: Response) {

        const { id } = req.params

        const messages = await prisma.chatMessages.findMany({
            where: {
                OR: [{
                    userId: Number(id)
                }, {
                    destinataryId: Number(id)
                }]
            }
        })

        return res.status(200).json(MessagesView(messages))

    }
}