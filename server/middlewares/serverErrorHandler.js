// eslint-disable-next-line no-unused-vars
export default (err, _req, res, next) => {
  res.status(500).json({
    status: 'error',
    error: 'internal server error'
  });
};
