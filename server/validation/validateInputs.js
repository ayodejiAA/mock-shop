const validateInputs = schema => (req, res, next) => {
  const options = {
    abortEarly: false
  };

  const { error, value } = schema.validate(req.body, options);

  if (!error) {
    req.body = value;
    return next();
  }

  const validationErrors = {};

  error.details.forEach(errorDetails => {
    const errorClone = { ...errorDetails };
    const { key } = errorClone.context;
    if (key in validationErrors) return;
    validationErrors[key] = errorClone.message.replace(/"/g, '');
  });

  return res.status(422).json({ status: 'error', errors: validationErrors });
};

export default validateInputs;
