// /lib/errorHandler.js
const errorHandler = (err, req, res) => {
  console.error(err.stack); // Log l'erreur dans la console

  const errorResponse = {
    success: false,
    message: err.message || "Une erreur serveur s'est produite",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Inclut la pile d'appels en mode développement
  };

  res.status(err.status || 500).json(errorResponse);
};

export default errorHandler;
