import {Express} from 'express';

import { listAllRoutes } from './listAllRoutes';
import {parseRoutes} from './parsers';

export default function defineRoutes(server: Express) {
  const routeFiles = listAllRoutes('api');
  const routes = parseRoutes(routeFiles);
  
  routes.forEach(async (route, index) => {
    const routeFunction = (await import('../../' + routeFiles[index].replace('.ts', '.js'))).default;
    server.all('/'+route, routeFunction);
  });  
}