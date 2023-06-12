require('dotenv').config();

const PORT = process.env.PORT || '8080';

// const MONGO_URI =
//   process.env.NODE_ENV === 'test'
//     ? process.env.DB_URI
//     : process.env.TEST_DB_URI;

const MONGO_URI = process.env.DB_URI;

module.exports = {
  PORT,
  MONGO_URI,
};
