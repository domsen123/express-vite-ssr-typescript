import fs from 'fs';
import { Router, Application } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';

export default function (app: Application) {
  const routeFiles = fs.readdirSync(__dirname);
  routeFiles.forEach((routeFile) => {
    if (routeFile === 'index.ts') return;
    const router = Router();
    const routeHandler = require(`./${routeFile.replace('.ts', '')}`).default;
    app.use('/_api', routeHandler(router));
  });
  app.use('/_api/*', (req, res) => res.status(404).end('Api Route not found'));
  app.use(errorHandler);
}
