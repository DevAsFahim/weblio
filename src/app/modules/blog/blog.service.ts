import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { User } from '../user/user.model';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog, userData: JwtPayload) => {
  const user = await User.findById(userData?.userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'This user is blocked');
  }

  const modifiedPayload = { ...payload, author: userData?.userId };

  const blog = await Blog.create(modifiedPayload);

  const populatedUser = await Blog.findById(blog._id).populate('author');

  return populatedUser;
};

export const BlogServices = {
  createBlogIntoDB,
};
