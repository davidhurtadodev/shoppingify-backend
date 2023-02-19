const Item = require('../models/Item');
const Category = require('../models/Category');
const List = require('../models/List');

const getAllElements = async () => {
  const items = await List.find({}).populate('items');
  return items;
};
const getOneElement = async (id) => {
  const list = await List.findById(id).populate('items');
  return list;
};

const deleteElement = async (id) => {
  try {
    await List.findByIdAndDelete(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = async (id, isCancelled) => {
  const updatedList = await List.findByIdAndUpdate(
    id,
    { isCancelled },
    { new: true }
  );
  return updatedList;
};

const createElement = async (body) => {
  // Validate if the list exist
  const listInDb = await List.findOne({
    name: body.category.toLowerCase(),
  });

  if (!listInDb) {
    const listToCreate = {
      name: body.name.toLowerCase(),
      status: body.status,
      items: body.items,
    };

    const createdList = new List(listToCreate);

    await createdList.save();

    const populatedList = await createdList.populate('items');

    return populatedList;
  }

  // Return error if existing
  return 'error';
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createElement,
  deleteElement,
};
