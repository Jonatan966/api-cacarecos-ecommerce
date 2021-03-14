import { app } from './app'

const serverPort = process.env.PORT || 5000

app.listen(serverPort, () =>
  console.log(`Servidor aberto na porta ${serverPort}`)
)
