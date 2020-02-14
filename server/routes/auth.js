import { Router } from 'express';
import Auth from '../controllers/AuthController';
import validate from '../validation';

const router = Router();

router.post('/signup', validate.signup, Auth.signup);
router.post('/login', validate.login, Auth.login);

export default router;
