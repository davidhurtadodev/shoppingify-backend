const itemService = require('../services/itemService');

const getAllItems = (req, res) => {
  const allItems = itemService.getAllItems();
  res.json(allItems);
};

const getOneItem = (req, res) => {
  const item = itemService.getOneItem();
  res.send('Get an existing item');
};

const createNewItem = (req, res) => {
  const createdItem = itemService.createOneItem();
  res.send('Create a items');
};

const updateItem = (req, res) => {
  const updatedItem = itemService.updateItem();
  res.send('Update item');
};

const deleteItem = (req, res) => {
  itemService.deleteItem();
  res.send('delete item');
};

module.exports = {
  getAllItems,
  getOneItem,
  updateItem,
  deleteItem,
  createNewItem,
};
