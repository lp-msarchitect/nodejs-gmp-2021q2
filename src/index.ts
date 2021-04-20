import express from 'express';
import { seedDB, models } from './db/db.client';
import { usersRouter } from './resources/user/user.router';

const app = express();
const port = 3000;

seedDB().then(() => {
  app.use(express.json());
  app.use('/users', usersRouter);

  app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
