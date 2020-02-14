import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { errorResponse } from '../helpers/jsonResponse';

config();

const authTokenVerification = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return errorResponse(res, 401,
      'Access Denied. No Token Provided');
  }

  try {
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    errorResponse(res, 401, 'invalid Token');
  }
};

export default authTokenVerification;
