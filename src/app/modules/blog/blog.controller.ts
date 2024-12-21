import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
