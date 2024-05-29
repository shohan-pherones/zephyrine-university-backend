import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';

const router: Router = express.Router();

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent);

router.delete('/:studentId', StudentController.deleteStudent);

router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
