import express from 'express'
import cors from 'cors'

import { routes } from './routes'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

const serverPort = process.env.PORT || 5000

server.use(routes)

server.listen(serverPort, () =>
  console.log(`Servidor aberto na porta ${serverPort}`)
)
