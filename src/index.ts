import express from 'express';
import db from './db/models';
import { usersRouter } from './resources/user';
import { groupsRouter } from './resources/group';
import { attachServiceLogger } from './middlewares/ServiceLogger';
import { errorHandler } from './middlewares/ErorrHandler';
import logger from 'common/logger';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(attachServiceLogger);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use(errorHandler);

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
    app.listen(port, () => {
      logger.info(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    logger.error('Unable to connect to the database:', error);
  });

process.on('uncaughtException', (err) => {
  logger.error(`Caught global exception: ${err}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
});
