import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully!',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.getSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.deleteStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDb(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully!',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
