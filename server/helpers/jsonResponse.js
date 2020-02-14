export const errorResponse = (res, statusCode, error) => res
  .status(statusCode).json({ status: 'error', error });

export const successResponse = (res, statusCode, data) => res.status(statusCode)
  .json({ status: 'success', data });
