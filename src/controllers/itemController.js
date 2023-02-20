const itemService = require('../services/itemService');
const Item = require('../models/Item');

const getAllElements = async (req, res) => {
  const allElements = await itemService.getAllElements();
  res.json(allElements);
};

const getOneElement = async (req, res) => {
  const { id } = req.params;
  const item = await itemService.getOneElement(id);
  res.status(200).json(item);
};

const createNewElement = async (req, res) => {
  const { body } = req;

  // Validate valid content
  if (!body.name || !body.category) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // Validate repetition
  const isRepeated = await Item.findOne({
    name: body.name.toLowerCase(),
  });

  if (isRepeated) {
    return res.status(400).json({
      error: 'repeated item',
    });
  }

  const createdItem = await itemService.createOneElement(body);
  return res.status(200).json(createdItem);
};

const updateElement = async (req, res) => {
  const updatedItem = await itemService.updateElement();
  res.json(updatedItem);
};

const deleteElement = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).end();
  }
  await itemService.deleteElement(id);
  return res.status(204).end();
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  deleteElement,
  createNewElement,
};
