import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router: Router = express.Router();

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesValidationSchema),
  CourseControllers.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesValidationSchema),
  CourseControllers.removeFaculties,
);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCrourse,
);

export const CourseRoutes = router;
