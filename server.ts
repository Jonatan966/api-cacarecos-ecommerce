import express from 'express';
//import dotenv from 'dotenv';

import defineRoutes from './src/utils/defineRoutes';

//dotenv.config();

const server = express();

defineRoutes(server);

server.get('/*', async (req,res) => {
  return res.status(404).json({error: 'ROTA INEXISTENTE'});
});

server.all('/teste', (req, res) => {
  return res.send('TESTE');
});

server.listen(process.env.PORT || 5001, () => console.log('Servidor aberto!'));