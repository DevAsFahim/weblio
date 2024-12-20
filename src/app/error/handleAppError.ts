/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';
import { Response } from 'express';
import config from '../config';

const handleAppError = (err: any, res: Response) => {
  const errorSources: TErrorSources = [
    {
      path: '',
      message: err?.message,
    },
  ];

  res.status(err?.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err?.statusCode,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default handleAppError;
