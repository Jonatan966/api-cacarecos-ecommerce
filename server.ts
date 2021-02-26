import express from 'express';
//import dotenv from 'dotenv';

import defineRoutes from './src/utils/defineRoutes';

//dotenv.config();

const server = defineRoutes(express());

server.all('/teste', (req, res) => {
  return res.send('TESTE');
});

server.listen(process.env.PORT || 5001, () => console.log('Servidor aberto!'));