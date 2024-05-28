import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create an empty user data object
  const userData: Partial<TUser> = {};

  // assign password, using default if not provided
  userData.password = password || (config.default_pass as string);
  // set user role to 'student'
  userData.role = 'student';

  // fetch the admission semester from the database
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // throw error if admission semester not found
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester is not found');
  }

  // create a new database session
  const session = await mongoose.startSession();

  try {
    // start a new transaction
    session.startTransaction();

    // generate a unique student ID based on the admission semester
    userData.id = await generateStudentId(admissionSemester);

    // create a new user within the transaction
    const newUser = await User.create([userData], { session });

    // throw error if user creation failed
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set the ID and user reference in the payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a new student record within the transaction
    const newStudent = await Student.create([payload], { session });

    // throw error if student creation failed
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // commit the transaction if all operations succeed
    await session.commitTransaction();

    // return the newly created student record
    return newStudent;
  } catch (error) {
    // abort the transaction in case of an error
    await session.abortTransaction();

    // throw error if student creation failed
    throw new Error('Failed to create student');
  } finally {
    // end the database session
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDb,
};
