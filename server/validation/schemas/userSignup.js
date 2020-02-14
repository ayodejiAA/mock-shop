import Joi from '@hapi/joi';

const userSignupSchema = Joi.object({
  firstName: Joi.string()
    .label('first name')
    .trim()
    .min(2)
    .max(50)
    .required()
    .pattern(new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'))
    .rule({ message: 'first name should include only letters' }),

  lastName: Joi.string()
    .label('last name')
    .trim()
    .min(2)
    .max(50)
    .required()
    .pattern(new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'))
    .rule({ message: 'last name should include only letters' }),

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

  isAdmin: Joi.boolean()
});

export default userSignupSchema;
