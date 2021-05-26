import fs from 'fs';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import cookies from 'isomorphic-cookie';
import initiateRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

export const createServer = async (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) => {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const app = express();

  app.use(cookieParser());
  app.use(bodyParser.json());

  const indexProd = isProd
    ? fs.readFileSync(resolve('../_dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProd
    ? // @ts-ignore
      require('../_dist/client/ssr-manifest.json')
    : {};

  let vite: ViteDevServer;
  if (!isProd) {
    vite = await createViteServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
      },
    });
    app.use(vite.middlewares);
    app.use(morgan('tiny'));
  } else {
    app.use(compression());
    app.use(serveStatic(resolve('../_dist/client'), { index: false }));
  }

  initiateRoutes(app);

  app.get('/_api/test_session', async (req, res) => {
    const cookieOptions = {
      secure: false,
      httpOnly: true,
    };

    let session;

    const cookie = cookies.load('APP_SESSION', req);
    if (cookie) {
      console.log('COOKIE', cookie);
      cookies.save('APP_SESSION', cookie, cookieOptions, res);
      session = cookie;
    } else {
      session = `APP_SESSION ${Math.floor(Math.random() * (100 - 1)) + 1}`;
      cookies.save('APP_SESSION', session, cookieOptions, res);
    }
    res.status(200).json({
      success: true,
      session,
    });
  });

  app.get('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve('../index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('app/entry-server.ts')).render;
      } else {
        template = indexProd;
        render = require('../_dist/server/entry-server.js').render;
      }
      const [appHtml, preloadLinks] = await render(url, {
        manifest,
        request: req,
        response: res,
      });

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite && vite.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return { app };
};
