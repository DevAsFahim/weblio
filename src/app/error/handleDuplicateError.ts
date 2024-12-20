/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';
import { Response } from 'express';
import config from '../config';
import { StatusCodes } from 'http-status-codes';

const handleDuplicateError = (err: any, res: Response) => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  res.status(StatusCodes.CONFLICT).json({
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: err.message,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default handleDuplicateError;
