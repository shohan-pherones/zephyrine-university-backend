import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { StudentValidations } from '../student/student.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router: Router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
