import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .max(20, 'First name cannot be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must be capitalized'),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .regex(/^[A-Za-z]+$/, 'Last name is not valid'),
});

const createGuardianValidationSchema = z.object({
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

const createLocalGuardianValidationSchema = z.object({
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
      name: createUserNameValidationSchema,
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must be capitalized')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Last name is not valid')
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z
    .object({
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          gender: z
            .enum(['male', 'female', 'other'], {
              errorMap: () => ({ message: 'Gender is not valid' }),
            })
            .optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().email('Email is not valid').optional(),
          contactNo: z.string().optional(),
          emergencyContactNo: z.string().optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
              errorMap: () => ({ message: 'Blood group is not valid' }),
            })
            .optional(),
          presentAddress: z.string().optional(),
          permanentAddress: z.string().optional(),
          guardian: updateGuardianValidationSchema.optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          profileImg: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
