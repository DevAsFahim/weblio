import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const register = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const loginUser = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  // check if user exists
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not found.');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is blocked.');
  }

  // check if password matches
  if (!(await bcrypt.compare(payload?.password as string, user.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  register,
  loginUser,
};
