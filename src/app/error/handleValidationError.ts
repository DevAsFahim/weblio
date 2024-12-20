import { TErrorSources } from '../interface/error';
import { Response } from 'express';
import config from '../config';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
  res: Response,
) => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  res.status(400).json({
    success: false,
    message: 'Validation error',
    statusCode: 400,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default handleValidationError;
