const Item = require('../models/Item');

const getAllItems = async () => {
  const items = await Item.find({});
  return items;
};
const getOneItem = () => {
  return;
};

const deleteItem = () => {
  return;
};

const updateItem = () => {};

const createOneItem = async () => {
  const { body } = req;

  // Validate valid content
  if (!body.name || !body.category) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  //Validate repeatition
  let isRepeated = await Item.findOne({
    name: body.name.toLowerCase(),
  });

  if (isRepeated) {
    return res.status(400).json({
      error: 'repeated item',
    });
  }

  // Validate if the category exist
  let categoryInDb = await Category.findOne({
    name: body.category.toLowerCase(),
  });

  if (!categoryInDb) {
    const newCategory = new Category({
      name: body.category.toLowerCase(),
    });

    const savedCategory = await newCategory.save();

    const itemToCreate = {
      name: body.name,
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

    return res.status(201).json(populatedItem);
  } else {
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

    const populatedItem = await Item.findById(savedItem.id).populate(
      'category'
    );

    return res.status(201).json(populatedItem);
  }
};

module.exports = {
  getAllItems,
  getOneItem,
  updateItem,
  createOneItem,
  updateItem,
  deleteItem,
};
