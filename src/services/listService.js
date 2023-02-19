// const Item = require('../models/Item');
// const Category = require('../models/Category');
const listDB = require('../db/Item');

const getAllElements = async () => {
  const lists = await listDB.getAllElements();
  return lists;
};

const getOneElement = async (id) => {
  const list = await listDB.getOneElement(id);
  return list;
};

const deleteElement = async (id) => {
  try {
    await listDB.deleteElement(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = () => {};

const createOneElement = async (body) => {
  // Validate if the category exist
  const createdList = await listDB.createOneElement(body);
  return createdList;
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createOneElement,
  deleteElement,
};
