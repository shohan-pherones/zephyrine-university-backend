import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the server!' });
});

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

export default app;
