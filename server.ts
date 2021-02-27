import express from 'express';
import defineRoutes from './src/utils/defineRoutes';
import DbMiddleware from './src/middlewares/DbMiddleware';

//import dotenv from 'dotenv';
//dotenv.config();

const server = express();
server.use(express.json());

const serverPort = process.env.PORT || 5000;

server.all('/api/*', DbMiddleware);
defineRoutes(server);

server.listen(serverPort, () => 
  console.log(`Servidor aberto na porta ${serverPort}`)
);