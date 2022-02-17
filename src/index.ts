// NPM imports
import express from 'express';
// import bodyParser from 'body-parser';
import helmet from 'helmet';

// Application imports
import config from './config';
import loggerFactory from './utils/logging';
import dbInit from './initializer';
import { serve, setup } from 'swagger-ui-express';

import { tokenHandler, errorHandler, corsHandler, healthCheckHandler } from './utils/middlewares';
import URLScraperRoutes from './routes/urlScrape.routes';
// Routes ...

// Swagger json
import { swaggerJson } from './swagger.json';
import { protectedRouteHandler } from './utils/middlewares/protectedRouteHandler';

// Intializations
const logger = loggerFactory.getLogger();
const app = express();

// To avoid client to know about express
app.use(helmet());

// To avoid 304 content not modified status.
app.disable('etag');

let server: import('http').Server;
(async () => {
  await dbInit();

  app.get('/healthcheck', healthCheckHandler);

  app.all('/*', corsHandler);

  // logger
  app.use(
    loggerFactory.connectLogger(loggerFactory.getLogger('http'), {
      level: 'auto',
    }),
  );

  // Basic Auth
  app.use(tokenHandler);

  // parse application/json
  app.use(express.json());

  app.use('/url', URLScraperRoutes());

  app.use(
    '/tracker',
    protectedRouteHandler,
    serve,
    setup(swaggerJson(), {
      customSiteTitle: 'URL Scrapper',
      customfavIcon: '/assets/favicon.ico',
    }),
  );

  // Error handling
  app.use(errorHandler);

  server = app.listen(config.port, () => {
    logger.info(`application is listening on port ${config.port} ...`);
  });
})().catch(err => {
  if (server && server.listening) server.close();
  logger.error(err);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  logger.error(err.stack);
  process.exit(1);
});
