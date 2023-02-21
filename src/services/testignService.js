const testingDB = require('../db/Testing');

const setDB = async () => {
  try {
    await testingDB.setDB();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  setDB,
};
