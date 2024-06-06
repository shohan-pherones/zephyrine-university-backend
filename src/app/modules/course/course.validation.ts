import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
  course: z.string({
    required_error: 'Course ID is required',
  }),
  isDeleted: z.boolean().default(false),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title is too long'),
    prefix: z
      .string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string',
      })
      .min(1, 'Prefix cannot be empty')
      .max(10, 'Prefix is too long'),
    code: z
      .number({
        required_error: 'Code is required',
        invalid_type_error: 'Code must be a number',
      })
      .min(1, 'Code must be a positive number'),
    credits: z
      .number({
        required_error: 'Credits are required',
        invalid_type_error: 'Credits must be a number',
      })
      .min(0, 'Credits cannot be negative'),
    preRequisiteCourses: z
      .array(createPreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z
    .string({
      required_error: 'Course ID is required',
    })
    .optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title is too long')
      .optional(),
    prefix: z
      .string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string',
      })
      .min(1, 'Prefix cannot be empty')
      .max(10, 'Prefix is too long')
      .optional(),
    code: z
      .number({
        required_error: 'Code is required',
        invalid_type_error: 'Code must be a number',
      })
      .min(1, 'Code must be a positive number')
      .optional(),
    credits: z
      .number({
        required_error: 'Credits are required',
        invalid_type_error: 'Credits must be a number',
      })
      .min(0, 'Credits cannot be negative')
      .optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesValidationSchema,
};
