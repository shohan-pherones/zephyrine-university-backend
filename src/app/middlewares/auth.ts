import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import User from '../modules/user/user.model';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, role, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    // check if the user is exists
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check if the user is already deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
    }

    // check if the user is blocked
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
