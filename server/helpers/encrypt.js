import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const hashPassword = password => bcrypt
  .hashSync(password, 10);

export const compareHash = (password, hash) => bcrypt
  .compareSync(password, hash);

export const generateToken = ({ id, email, isAdmin }) => {
  const payload = { id, email, isAdmin };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '12h'
  });
  return token;
};
