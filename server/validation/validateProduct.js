export default (schema) => (req, res, next) => {
  const options = {
    abortEarly: false
  };

  if (req.body.price) req.body.price = parseFloat(req.body.price);
  if (req.file) req.body.image = req.file.buffer;

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

  return res.status(422).json({ success: false, errors: validationErrors });
};
