import express from 'express';
import db from './db/models';
import { usersRouter } from './resources/user';
import { groupsRouter } from './resources/group';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
