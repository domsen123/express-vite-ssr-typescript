import httpServer from 'http';
import { createServer } from '../server';
import appConfig from '@/config/app-config';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: any) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

(async () => {
  const port = normalizePort(appConfig.port || '3000');
  const { app } = await createServer();

  const server = httpServer.createServer(app);
  server.listen(port, () => console.log(`👂 server is listening on ${port}`));
})();
