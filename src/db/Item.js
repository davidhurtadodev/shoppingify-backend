const Item = require('../models/Item');
const Category = require('../models/Category');

const getAllElements = async () => {
  const items = await Item.find({}).populate('category');
  return items;
};
const getOneElement = async (id) => {
  const item = await Item.findById(id);
  return item;
};

const deleteElement = async (id) => {
  try {
    await Item.findByIdAndDelete(id);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateElement = () => {};

const createElement = async (body) => {
  // Validate if the category exist
  const categoryInDb = await Category.findOne({
    name: body.category.toLowerCase(),
  });

  if (!categoryInDb) {
    const newCategory = new Category({
      name: body.category.toLowerCase(),
    });

    const savedCategory = await newCategory.save();

    const itemToCreate = {
      name: body.name.toLowerCase(),
      ...(body.note && { note: body.note }),
      ...(body.imageUrl && { imageUrl: body.imageUrl }),
      category: savedCategory.id,
    };

    const createdItem = new Item(itemToCreate);

    const savedItem = await createdItem.save();

    savedCategory.items = [...savedCategory.items, savedItem._id];

    await savedCategory.save();

    const populatedItem = await Item.findById(savedItem.id).populate(
      'category'
    );

    return populatedItem;
  }
  const itemToCreate = {
    name: body.name.toLowerCase(),
    ...(body.note && { note: body.note }),
    ...(body.imageUrl && { imageUrl: body.imageUrl }),
    category: categoryInDb.id,
  };

  const createdItem = new Item(itemToCreate);

  const savedItem = await createdItem.save();

  categoryInDb.items = [...categoryInDb.items, savedItem._id];

  await categoryInDb.save();

  const populatedItem = await Item.findById(savedItem.id).populate('category');

  return populatedItem;
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  createElement,
  deleteElement,
};
