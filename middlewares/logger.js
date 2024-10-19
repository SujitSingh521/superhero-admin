const logger = (req, res, next) => {
  const logEntry = `URL: ${req.originalUrl}, Method: ${req.method}, Timestamp: ${new Date().toString()}`;
  console.log(logEntry);
  next();
};

module.exports = {
  logger,
};
