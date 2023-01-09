module.exports = (res, statusCode, status, message) => {
  return res.status(statusCode).json({
    status,
    message,
  });
};
