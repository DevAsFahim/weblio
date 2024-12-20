import { TErrorSources } from '../interface/error';
import { Response } from 'express';
import config from '../config';
import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
  res: Response,
) => {
  const errorSources: TErrorSources =  [
    {
      path: err.path,
      message: err.message,
    },
  ];

  res.status(400).json({
    success: false,
    message: 'Invalid ID',
    statusCode: 400,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default handleCastError;
