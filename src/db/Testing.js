const List = require('../models/List');
const Category = require('../models/Category');
const Item = require('../models/Item');

const setDB = async () => {
  await Item.deleteMany({});
  await Category.deleteMany({});
  await List.deleteMany({});
};

module.exports = {
  setDB,
};
