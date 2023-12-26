export const errorMiddlewares = (err, req, res, next) => {
  err.message = err.message || "Inrternal Server Error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
  next();
};
