import db from './db/models';
import app from './app';
import logger from './common/logger';

const port = process.env.SERVER_PORT || 3000;

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
