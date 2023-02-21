const testingService = require('../services/testignService');

const setDB = async (req, res, next) => {
  try {
    await testingService.setDB();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  setDB,
};
