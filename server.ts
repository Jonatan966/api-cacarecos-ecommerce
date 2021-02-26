import express from 'express';
import defineRoutes from './src/utils/defineRoutes';

//import dotenv from 'dotenv';
//dotenv.config();

const server = express();
server.use(express.json());

const serverPort = process.env.PORT || 5000;

defineRoutes(server);

server.listen(serverPort, () => 
  console.log(`Servidor aberto na porta ${serverPort}`)
);