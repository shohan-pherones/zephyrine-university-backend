import express, { Router } from 'express';
import { StudentController } from './student.controller';

const router: Router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
