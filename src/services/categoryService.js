const categoryDB = require('../db/Category');

const getAllElements = async () => {
  try {
    const categories = await categoryDB.getAllElements();
    return categories;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getOneElement = async (id) => {
  try {
    const category = await categoryDB.getOneElement(id);
    return category;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteElement = async (id) => {
  try {
    await categoryDB.deleteElement(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = () => {};

const createOneElement = async (body) => {
  try {
    const createdCategory = await categoryDB.createElement(body);
    return createdCategory;
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
