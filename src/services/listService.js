// const Item = require('../models/Item');
// const Category = require('../models/Category');
const listDB = require('../db/List');

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
    const mappedItems = body.items.map((item) => ({
      item: item.item.id,
      quantity: item.quantity,
    }));

    const { items, ...listToDb } = body;
    listToDb.items = mappedItems;
    // console.log({ before: listToDb.items });
    const createdList = await listDB.createElement(listToDb);
    // console.log({ after: createdList });
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
