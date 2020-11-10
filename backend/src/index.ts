import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'
import http from 'http'


const server = express()
const app = http.createServer(server)



server.use(express.json())
server.use(cors())
server.use(routes)
server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333)