const listService = require('../services/listService');
const List = require('../models/List');

const getAllElements = async (req, res) => {
  const allElements = await listService.getAll();
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
  if (
    !body.name ||
    !body.category ||
    !body.date ||
    !body.items ||
    !body.isCancelled
  ) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // Validate repetition
  const isRepeated = await List.findOne({
    name: body.name.toLowerCase(),
  });

  if (isRepeated) {
    return res.status(400).json({
      error: 'repeated item',
    });
  }

  const createdList = await listService.createOneElement(body);
  return res.status(200).json(createdList);
};

const updateElement = async (req, res) => {
  const { id, isCancelled } = req.body;
  const updatedElement = await listService.updateList(id, isCancelled);
  res.json(updatedElement);
};

const deleteElement = (req, res) => {
  listService.deleteElement();
  res.status(204).end();
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  deleteElement,
  createNewElement,
};
