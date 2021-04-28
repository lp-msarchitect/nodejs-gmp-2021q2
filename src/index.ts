import express from 'express';
import { initModels } from './db/db.client';
import { usersRouter } from './resources/user';
import { groupsRouter } from './resources/group';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.listen(port, () => {
  initModels();
  console.log(`Server listening at http://localhost:${port}`);
});
