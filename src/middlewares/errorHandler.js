import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error.status && typeof error.status === 'number') {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
