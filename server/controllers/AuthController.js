import models from '../database/models';
import { errorResponse, successResponse } from '../helpers/jsonResponse';
import { hashPassword, compareHash, generateToken } from '../helpers';

const { User } = models;

class AuthController {
  static async signup(req, res, next) {
    try {
      const { body } = req;
      if (await User.findByEmail(body.email)) {
        return errorResponse(res, 409, 'email has already been taken');
      }
      body.password = await hashPassword(body.password);
      const { dataValues: user } = await User.create(body);
      user.token = generateToken(user);
      res.set('Authorization', user.token);
      const data = AuthController.getUserData(user);
      return successResponse(res, 201, { ...data });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { body } = req;
      const user = await User.findByEmail(body.email);
      let isPasswordValid;
      if (user) isPasswordValid = compareHash(body.password, user.password);
      if (!user || !isPasswordValid) {
        return errorResponse(res, 401, 'email or password incorrect');
      }
      user.token = generateToken(user);
      res.set('Authorization', user.token);
      const data = AuthController.getUserData(user);
      return successResponse(res, 200, { ...data });
    } catch (error) {
      next(error);
    }
  }

  static getUserData(user) {
    const {
      id, email, firstName, lastName, isAdmin, token
    } = user;

    return {
      id,
      email,
      firstName,
      lastName,
      isAdmin,
      token
    };
  }
}

export default AuthController;
