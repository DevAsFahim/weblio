/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import mongoose from 'mongoose';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/AppError';
import handleAppError from '../error/handleAppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    handleZodError(err, res);
  }
  if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  }
  if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  }
  if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  }
  if (err instanceof AppError) {
    handleAppError(err, res);
  }

  //ultimate return
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    statusCode: 500,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
