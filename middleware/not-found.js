// not used in this project but kept for reference

// for any not found route we use this
{
  /* <Route path="*" element={<Error />} /> */
}

const notFoundMiddleware = (req, res) => {
  res.status(404).send(
    `<h1>404 Not Found</h1>
    <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>`
  );
};

export default notFoundMiddleware;
