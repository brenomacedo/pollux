import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'
import * as Yup from 'yup'
import { UsersView, UserView } from '../views/UserView'

const prisma = new PrismaClient()

export default {
    async createUser(req: Request, res: Response) {
        const { name, email, password: rawPassword } = req.body
        const data = { name, email, password: rawPassword }

        const schema = Yup.object().shape({
            name: Yup.string().required("O nome é obrigatório!"),
            email: Yup.string().email("Formato de email inválido!")
                .required("O email é obrigatório!"),
            password: Yup.string().min(8, "Sua senha deve ter entre 8 e 16 caracteres!")
                .max(16, "Sua senha deve ter entre 8 e 16 caracteres!")
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
            }
        })

        if(!user || !user.password) {
            return res.status(500).json({ errors: ['Usuário ou senha incorretos!'] })
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(500).json({ errors: ['Usuário ou senha incorretos!'] })
        }

        const token = jwt.sign({ id: user.id }, key, { expiresIn: 86400 })

        return res.status(201).json({ user: UserView(user), token })

    },

    async verifyToken(req: Request, res: Response) {
        
        const user = await prisma.user.findOne({
            where: {
                id: req.body.userId
            }
        })

        if(!user) {
            return res.status(500).json({ errors: ['Usuário desconhecido!'] })
        }

        return res.status(200).json(UserView(user))

    },

    async searchFriend(req: Request, res: Response) {

        const { search, id } = req.query

        const schema = Yup.object().shape({
            id: Yup.number().required('Insira o id do usuário!'),
            name: Yup.string().required('Insira o nome do usuário que você está pesquisando!')
        })
        
        try {
            schema.validate(schema)
        } catch(e) {
            return res.status(500).json({ errors: e.errors })
        }

        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: String(search),
                            mode: "insensitive"
                        }
                    },
                    {
                        id: {
                            not: Number(id)
                        }
                    }
                ]
            }
        })

        return res.status(200).json(UsersView(users))

    }
}