const notFoundMiddleware = (req, res) => {
  res.status(404).send("Not found");
};

export default notFoundMiddleware;
