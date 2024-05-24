import mongoose, { model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new mongoose.Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const User = model<TUser>('User', userSchema);
export default User;
