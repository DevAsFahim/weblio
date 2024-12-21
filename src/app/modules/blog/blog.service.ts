import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { User } from '../user/user.model';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

const updateBlogIntoDB = async (payload: Partial<IBlog>, id: string) => {
  const updatedData = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  const result = await Blog.findById(updatedData?._id).populate('author');

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(['title', 'content'])
    .filterByAuthor()
    .sort();

  const result = await blogQuery.modelQuery;

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
