import {Express} from 'express';

import { listAllRoutes } from './listAllRoutes';

export default function defineRoutes(server: Express) {
  const routeFiles = listAllRoutes('api');

  routeFiles.forEach(async route => {
    const router = (await import(`../../${route.replace('.ts', '.js')}`)).default;
    server.use(router);
    console.log(`Rota "/${route}" carregada!`);
  });
}