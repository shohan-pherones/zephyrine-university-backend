import { TStudent } from './student.interface';
import StudentModel from './student.model';

const createStudentIntoDb = async (student: TStudent) => {
  if (await StudentModel.isStudentExist(student.id)) {
    throw new Error('Student already exists');
  }
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
