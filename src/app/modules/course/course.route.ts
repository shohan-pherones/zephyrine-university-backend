import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.get('/', CourseControllers.getAllCourses);

router.get(
  '/:id',
  auth('student', 'faculty', 'admin'),
  CourseControllers.getSingleCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesValidationSchema),
  CourseControllers.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidations.facultiesValidationSchema),
  CourseControllers.removeFaculties,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCrourse,
);

export const CourseRoutes = router;
