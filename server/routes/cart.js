import { Router } from 'express';

import Cart from '../controllers/CartController';
import { verifyAuthToken } from '../middlewares';

const router = Router();

router.get('/', verifyAuthToken, Cart.getAll);

export default router;
