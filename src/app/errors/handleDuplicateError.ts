import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMesssage = match && match[1];

  const statusCode = 400;

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMesssage} already exists`,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
