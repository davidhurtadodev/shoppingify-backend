const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./lib/config');

const v1ItemRouter = require('./v1/routes/itemRoute');
const v1ListRouter = require('./v1/routes/listRoute');

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

app.listen(config.PORT, () => {
  console.log(`API is listening on port ${config.PORT}`);
});
