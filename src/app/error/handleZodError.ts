import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import { Response } from 'express';
import config from '../config';

const handleZodError = (err: ZodError, res: Response) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
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

export default handleZodError;
