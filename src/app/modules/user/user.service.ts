import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import Admin from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

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
  } catch (error: any) {
    // abort the transaction in case of an error
    await session.abortTransaction();

    // throw error if student creation failed
    throw new Error(error.message);
  } finally {
    // end the database session
    await session.endSession();
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDB,
  createAdminIntoDB,
};
