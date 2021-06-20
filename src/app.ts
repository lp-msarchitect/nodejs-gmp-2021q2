import express from 'express';
import cors from 'cors';
import { usersRouter } from './resources/user';
import { groupsRouter } from './resources/group';
import { attachServiceLogger, requestLogger } from './middlewares/ServiceLogger';
import { errorHandler } from './middlewares/ErorrHandler';
import { authRouter } from './auth/auth.router';
import { authToken } from './middlewares/auth';

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(attachServiceLogger);
app.use(authToken);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/', authRouter);
app.use(errorHandler);

export default app;
