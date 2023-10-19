// /lib/errorHandler.js
const errorHandler = (err, req, res) => {
  console.error(err.stack);

  const errorResponse = {
    success: false,
    message: err.message || "Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(err.status || 500).json(errorResponse);
};

export default errorHandler;
