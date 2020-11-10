import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'
import http from 'http'
import socket from 'socket.io'

interface IClient {
    id: number
    socketId: string
}

interface INewMessage {
    id: number
    content: string
    type: string
    createdAt: number
    userId: number
    destinataryId: number
}

interface IFriendRequest {
    status: string
    from: {
        id: number
        name: string
        avatar: string
        description: string | null
    }
}

const server = express()
const app = http.createServer(server)

const io = socket(app)

var clients: IClient[] = []

io.on("connection", socket => {

    console.log('connect')

    socket.on("newConnection", (id: number) => {
        const clientsIds = clients.map(client => {
            return client.id
        })

        if(clientsIds.includes(id)) {
            const clientIndex = clientsIds.indexOf(id)
            clients[clientIndex] = { id, socketId: socket.id }

            console.log('cliente atualizado!', socket.id, id)
        } else {
            clients = [...clients, { id, socketId: socket.id }]

            console.log('novo cliente conectado!', socket.id, id)
        }
    })

    socket.on('newMessage', (newMessage: INewMessage) => {
        const clientsIds = clients.map(client => {
            return client.id
        })

        if(!clientsIds.includes(newMessage.destinataryId)) {
            return console.log('usuário offline')
        }

        const clientIndex = clientsIds.indexOf(newMessage.destinataryId)
        const clientSocketId = clients[clientIndex].socketId

        io.to(clientSocketId).emit('newMessage', newMessage)
    })

    socket.on('friendRequest', (friendRequest: { request: IFriendRequest, destId: number }) => {
        const clientsIds = clients.map(client => {
            return client.id
        })

        if(!clientsIds.includes(friendRequest.destId)) {
            return console.log('usuário offline')
        }

        const clientIndex = clientsIds.indexOf(friendRequest.destId)
        const clientSocketId = clients[clientIndex].socketId

        io.to(clientSocketId).emit('friendRequest', friendRequest.request)
    })

    socket.on("disconnect", () => {
        clients = clients.filter(client => client.socketId !== socket.id)
        
        console.log('cliente desconectado!', socket.id)
    })
})

server.use(express.json())
server.use(cors())
server.use(routes)
server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333)