require('dotenv').config();

const { PORT } = process.env;

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_URI
    : process.env.TEST_DB_URI;

module.exports = {
  PORT,
  MONGO_URI,
};
