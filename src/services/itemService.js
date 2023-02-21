// const Item = require('../models/Item');
// const Category = require('../models/Category');
const itemDB = require('../db/Item');

const getAllElements = async () => {
  try {
    const items = await itemDB.getAllElements();
    return items;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getOneElement = async (id) => {
  try {
    const item = await itemDB.getOneElement(id);
    return item;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteElement = async (id) => {
  try {
    await itemDB.deleteElement(id);
    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateElement = () => {};

const createOneElement = async (body) => {
  try {
    const createdItem = await itemDB.createElement(body);
    return createdItem;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createOneElement,
  deleteElement,
};
