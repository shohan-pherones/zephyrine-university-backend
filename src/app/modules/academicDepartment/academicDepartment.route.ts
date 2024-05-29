import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router: Router = express.Router();

router.get('/', AcademicDepartmentControllers.getAcademicDepartments);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
