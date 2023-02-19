const itemService = require('../services/itemService');
const Item = require('../models/Item');

const getAllElements = async (req, res) => {
  const allElements = await listtService.getAll();
  res.json(allElements);
};

const getOneElement = async (req, res) => {
  const { id } = req.body;
  const element = await listService.getOne(id);
  res.status(200).json(element);
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

  const createdItem = await itemService.createOneItem(body);
  return res.status(200).json(createdItem);
};

const updateElement = async (req, res) => {
  const updatedElement = await listService.updateList();
  res.json(updatedElement);
};

const deleteElement = (req, res) => {
  itemService.deleteElement();
  res.status(204).end();
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  deleteElement,
  createNewElement,
};
