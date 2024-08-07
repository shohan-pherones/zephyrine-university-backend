import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.get('/', StudentController.getAllStudents);

router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentController.getSingleStudent,
);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
