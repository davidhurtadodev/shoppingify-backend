const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' });
};
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

module.exports = {
  unknowEndpoint,
  errorHandler,
};
