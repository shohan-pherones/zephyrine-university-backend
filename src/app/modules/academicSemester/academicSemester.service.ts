import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemestersFromDb = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getAnAcademicSemesterFromDb = async (slug: string) => {
  const result = await AcademicSemester.findById(slug);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester is not found!');
  }

  return result;
};

const updateAcademicSemesterIntoDb = async (
  slug: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate(
    { _id: slug },
    payload,
    {
      new: true,
    },
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating academic semester!',
    );
  }

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemestersFromDb,
  getAnAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
