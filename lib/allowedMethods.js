const allowedMethods = (methods) => (handler) => (req, res) => {
  if (!methods.includes(req.method)) {
    res.setHeader("Allow", methods.join(", "));
    res.status(405).end(`Method ${req.method} not authorized`);
    return;
  }
  return handler(req, res);
};

export default allowedMethods;
