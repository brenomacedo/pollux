import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'
import * as Yup from 'yup'
import { UserView, UserViewWM } from '../views/UserView'

const prisma = new PrismaClient()

export default {
    async createUser(req: Request, res: Response) {
        const { name, email, password: rawPassword } = req.body
        const data = { name, email, password: rawPassword }

        const schema = Yup.object().shape({
            name: Yup.string().required("O nome é obrigatório!"),
            email: Yup.string().email("Formato de email inválido!")
                .required("O email é obrigatório!"),
            password: Yup.string().min(8, "Seu nome deve ter entre 8 e 16 caracteres!")
                .max(16, "Seu nome deve ter entre 8 e 16 caracteres!")
                .required("A senha é obrigatória!")
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            })
        } catch (e) {
            return res.status(500).json({ errors: e.errors })
        }

        const password = await bcrypt.hash(rawPassword, 10)

        try {
            const user = await prisma.user.create({
                data: {
                    name, email, password
                }
            })

            return res.status(201).json(UserView(user))

        } catch (e) {
            return res.status(500).json({ errors: ['Email já cadastrado!'] })
        }

    },

    async authUser(req: Request, res: Response) {

        const { email, password } = req.body

        const user = await prisma.user.findOne({
            where: {
                email
            },
            include: {
                chatMessages_chatMessages_destinataryIdTouser: true,
                chatMessages_chatMessages_userIdTouser: true
            }
        })

        if(!user || !user.password) {
            return res.status(500).json({ errors: ['Usuário ou senha incorretos!'] })
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(500).json({ errors: ['Usuário ou senha incorretos!'] })
        }

        const token = jwt.sign({ id: user.id }, key, { expiresIn: 86400 })

        return res.status(201).json({ user: UserViewWM(user), token })

    },

    async verifyToken(req: Request, res: Response) {
        
        const user = await prisma.user.findOne({
            where: {
                id: req.body.userId
            },
            include: {
                chatMessages_chatMessages_destinataryIdTouser: true,
                chatMessages_chatMessages_userIdTouser: true
            }
        })

        if(!user) {
            return res.status(500).json({ errors: ['Usuário desconhecido!'] })
        }

        return res.status(200).json(UserView(user))

    }
}