// const Item = require('../models/Item');
// const Category = require('../models/Category');
const listDB = require('../db/Item');

const getAllElements = async () => {
  try {
    const lists = await listDB.getAllElements();
    return lists;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getOneElement = async (id) => {
  try {
    const list = await listDB.getOneElement(id);
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
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
  try {
    const createdList = await listDB.createOneElement(body);
    return createdList;
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
