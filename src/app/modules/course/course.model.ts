import { Schema, model, Types } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourse,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

export const Course = model<TCourse>('Course', courseSchema);
export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
