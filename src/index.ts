import express from 'express';
import { initModels } from './db/db.client';
import { usersRouter } from './resources/user';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersRouter);

app.listen(port, () => {
  initModels();
  console.log(`Example app listening at http://localhost:${port}`);
});
