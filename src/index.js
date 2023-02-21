const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./lib/config');
const middlewares = require('./lib/middlewares');

const v1ItemRouter = require('./v1/routes/itemRoute');
const v1ListRouter = require('./v1/routes/listRoute');

const v1TestingRouter = require('./v1/routes/testingRoute');

const app = express();

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());

app.use('/api/v1/items', v1ItemRouter);
app.use('/api/v1/lists', v1ListRouter);

app.use('/api/v1/testing', v1TestingRouter);

app.use(middlewares.unknowEndpoint);
app.use(middlewares.errorHandler);

app.listen(config.PORT, () => {
  console.log(`API is listening on port ${config.PORT}`);
});

module.exports = app;
