/* eslint-disable no-unused-vars */
const Category = require('../models/Category');

const getAllElements = async () => {
  const categories = await Category.find({}).populate('items');
  return categories;
};
const getOneElement = async (id) => {
  const category = await Category.findById(id).populate('items');
  return category;
};

const deleteElement = async (id) => {
  try {
    await Category.findByIdAndDelete(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = async (id, isCancelled) => {
  //   const updatedCategory = await Category.findByIdAndUpdate(
  //     id,
  //     { isCancelled },
  //     { new: true }
  //   );
  //   return updatedCategory;
};

const createElement = async (body) => {
  //   const { name, isCancelled, items, date } = body;
  //   // Validate if the list exist
  //   const listInDb = await List.findOne({
  //     name: name.toLowerCase(),
  //   });
  //   if (!listInDb) {
  //     const listToCreate = {
  //       name: name.toLowerCase(),
  //       isCancelled,
  //       items,
  //       date,
  //     };
  //     const createdList = new List(listToCreate);
  //     await createdList.save();
  //     const populatedList = await createdList.populate('items');
  //     return populatedList;
  //   }
  //   // Return error if existing
  //   return 'error';
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createElement,
  deleteElement,
};
