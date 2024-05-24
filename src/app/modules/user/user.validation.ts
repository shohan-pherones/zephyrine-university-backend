import { z } from 'zod';

const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, 'Password must be at most 20 characters long')
    .optional(),
});

export default UserValidationSchema;
