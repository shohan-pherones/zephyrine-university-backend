import { z } from 'zod';

const UserValidationSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
  }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20, 'Password must be at most 20 characters long'),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z
    .enum(['admin', 'student', 'faculty'], {
      required_error: 'Role is required',
      invalid_type_error:
        'Role must be one of "admin", "student", or "faculty"',
    })
    .optional(),
  status: z
    .enum(['in-progress', 'blocked'], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be either "in-progress" or "blocked"',
    })
    .optional(),
  isDeleted: z.boolean().optional().default(false),
});

export default UserValidationSchema;
