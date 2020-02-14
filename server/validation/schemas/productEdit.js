import Joi from '@hapi/joi';

const productEditSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(25),

  description: Joi.string()
    .min(10)
    .max(500)
    .trim(),

  category: Joi.string()
    .min(2)
    .max(20)
    .trim(),

  price: Joi.number()
    .min(0)
    .positive()
    .strict()
    .precision(2),

  image: Joi.binary()
    .strict()
    .encoding('base64')
    .max(0.5 * 1024 * 1024),


  inStock: Joi.boolean()
});

export default productEditSchema;
