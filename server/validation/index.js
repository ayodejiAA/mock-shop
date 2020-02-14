import validate from './validateInputs';
import validateProduct from './validateProduct';

/* Validation Schemas */
import userSignupSchema from './schemas/userSignup';
import userLoginSchema from './schemas/userLogin';
import productAddSchema from './schemas/productAdd';
import productEditSchema from './schemas/productEdit';

export default {
  signup: validate(userSignupSchema),
  login: validate(userLoginSchema),
  productAdd: validateProduct(productAddSchema),
  productEdit: validateProduct(productEditSchema)
};
