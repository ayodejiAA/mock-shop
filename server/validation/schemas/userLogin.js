import Joi from '@hapi/joi';

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
    .lowercase()
    .trim()
    .required()
    .min(3)
    .max(254)
    .required(),

  password: Joi.string()
    .min(8)
    .max(24)
    .required()
    .pattern(new RegExp('^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]+$'))
    .rule({
      message: 'password should include digits, '
    + 'lowercase and uppercase characters'
    }),
});

export default userLoginSchema;
