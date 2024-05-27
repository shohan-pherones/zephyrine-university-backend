import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .max(20, 'First name cannot be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must be capitalized'),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .regex(/^[A-Za-z]+$/, 'Last name is not valid'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: "Father's name is required" }),
  fatherOccupation: z.string({
    required_error: "Father's occupation is required",
  }),
  fatherContactNo: z.string({
    required_error: "Father's contact number is required",
  }),
  motherName: z.string({ required_error: "Mother's name is required" }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
  }),
  motherContactNo: z.string({
    required_error: "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: "Local guardian's name is required" }),
  occupation: z.string({
    required_error: "Local guardian's occupation is required",
  }),
  contactNo: z.string({
    required_error: "Local guardian's contact number is required",
  }),
  address: z.string({ required_error: "Local guardian's address is required" }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, 'Password cannot be more than 20 characters'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender is not valid' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Email is not valid'),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Blood group is not valid' }),
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
