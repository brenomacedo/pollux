import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token) {
        return res.status(500).json({ errors: ['Token não enviado!'] })
    }

    if(token.split(' ').length !== 2) {
        return res.status(500).json({ errors: ['Formato de token inválido!'] })
    }

    if(token.split(' ')[0] !== 'Bearer') {
        return res.status(500).json({ errors: ['Formato de token inválido!'] })
    }

    jwt.verify(token.split(' ')[1], key, (error, decoded: any) => {
        if(error) {
            return res.status(500).json({ errors: ['Token inválido!'] })
        }

        req.body.userId = decoded.id

        next()
    })

}

export default authMiddleware