import { errorResponse } from '../helpers';

const authorize = role => (req, res, next) => {
  const { isAdmin } = req.user;

  if (isAdmin === role.isAdmin) return next();

  errorResponse(res, 403, 'unauthorized user');
};

export const authorizeAdmin = authorize({ isAdmin: true });
export const authorizeBasicUser = authorize({ isAdmin: false });
