import express, { Router } from 'express';
import { UserControllers } from './user.controller';

const router: Router = express.Router();

router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
