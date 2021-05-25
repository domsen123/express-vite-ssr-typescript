import fs from 'fs';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import { createServer as createViteServer, ViteDevServer } from 'vite';

const createServer = async (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) => {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const app = express();

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
  } else {
    app.use(compression());
    app.use(serveStatic(resolve('../_dist/client'), { index: false }));
  }

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
      const [appHtml, preloadLinks] = await render(url, manifest);

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

createServer()
  .then(({ app }) => app.listen(3000, () => console.log('listening on 3000')))
  .catch();
