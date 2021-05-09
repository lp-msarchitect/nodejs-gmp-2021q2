import express from 'express';
import db from './db/models';
import { initModels } from './db/db.client';
import { usersRouter } from './resources/user';
import { groupsRouter } from './resources/group';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(port, () => {
  // initModels();
  console.log(`Server listening at http://localhost:${port}`);
});
