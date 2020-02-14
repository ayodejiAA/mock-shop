import Joi from '@hapi/joi';

const productAddSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(25)
    .required(),

  description: Joi.string()
    .min(10)
    .max(500)
    .trim()
    .required(),

  category: Joi.string()
    .min(2)
    .max(20)
    .trim()
    .required(),

  price: Joi.number()
    .min(0)
    .positive()
    .strict()
    .precision(2)
    .required(),

  image: Joi.binary()
    .strict()
    .encoding('base64')
    .max(0.5 * 1024 * 1024)
    .required(),

  inStock: Joi.boolean().required()
});

export default productAddSchema;
