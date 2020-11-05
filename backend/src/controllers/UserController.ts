import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'

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
            return res.status(500).json({ errors: ['erro'] })
        }

        const password = await bcrypt.hash(rawPassword, 10)

        try {
            const user = await prisma.user.create({
                data: {
                    name, email, password
                }
            })

            return res.status(201).json(user)
            
        } catch (e) {
            return res.status(500).json({ errors: ['Email já cadastrado!'] })
        }

    },

    authUser(req: Request, res: Response) {

    }
}