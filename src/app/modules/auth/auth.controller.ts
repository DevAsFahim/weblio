import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});
 
export const AuthController = {
  register,
  loginUser,
};
