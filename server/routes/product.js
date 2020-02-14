import { Router } from 'express';

import Product from '../controllers/ProductController';
import Cart from '../controllers/CartController';
import validate from '../validation';
import { multerUploads, verifyAuthToken, authorizeAdmin } from '../middlewares';

const router = Router();

const validateParams = '([0-9]+)+?';

router.post(
  '/',
  verifyAuthToken,
  authorizeAdmin,
  multerUploads('image'),
  validate.productAdd,
  Product.add
);

router.get('/', Product.getAll);

router.delete(
  `/:productId${validateParams}`,
  verifyAuthToken,
  authorizeAdmin,
  Product.delete
);

router.patch(
  `/:productId${validateParams}`,
  verifyAuthToken,
  authorizeAdmin,
  multerUploads('image'),
  validate.productEdit,
  Product.update
);

router.post(`/:productId${validateParams}/cart`,
  verifyAuthToken, Cart.add);

router
  . delete(`/:productId${validateParams}/cart`, verifyAuthToken,
    Cart.deleteOne);

export default router;
