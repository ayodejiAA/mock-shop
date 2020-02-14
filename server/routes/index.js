import { Router } from 'express';

import auth from './auth';
import product from './product';
import cart from './cart';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to the mock-shop API'
}));

router.use('/auth', auth);
router.use('/products', product);
router.use('/cart', cart);

export default router;
