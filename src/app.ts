import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the server!' });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
