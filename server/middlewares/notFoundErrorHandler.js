export default (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'the requested url was not found on this server'
  });
};
