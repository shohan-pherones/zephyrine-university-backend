import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { UserControllers } from './user.controller';
import { FacultyValidations } from '../faculty/faculty.validation';

const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;
