import express from 'express';
import { connectToDB } from './db/db.client';
import { usersRouter } from './resources/user/user.router';

const app = express();
const port = 3000;

connectToDB().then((seq) => {
  app.use(express.json());
  app.use('/users', usersRouter);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    seq.sync();
    console.log('Database synced.');
  });
});
