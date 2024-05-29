import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentsFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');

  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department is not found',
    );
  }

  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update academic department',
    );
  }

  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
