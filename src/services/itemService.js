// const Item = require('../models/Item');
// const Category = require('../models/Category');
const itemDB = require('../db/Item');

const getAllElements = async () => {
  const items = await itemDB.getAllElements();
  return items;
};

const getOneElement = async (id) => {
  const item = await itemDB.getOneElement(id);
  return item;
};

const deleteElement = async (id) => {
  try {
    await itemDB.deleteElement(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = () => {};

const createOneElement = async (body) => {
  // Validate if the category exist
  const createdItem = await itemDB.createElement(body);
  return createdItem;
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createOneElement,
  deleteElement,
};
