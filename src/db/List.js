const List = require('../models/List');

const getAllElements = async () => {
  const lists = await List.find({}).populate('items');
  return lists;
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
  const { name, isCancelled, items, date } = body;
  // Validate if the list exist
  const listInDb = await List.findOne({
    name: name.toLowerCase(),
  });

  if (!listInDb) {
    const listToCreate = {
      name: name.toLowerCase(),
      isCancelled,
      items,
      date,
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
