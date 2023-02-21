const listService = require('../services/listService');
const List = require('../models/List');

const getAllElements = async (req, res, next) => {
  try {
    const allElements = await listService.getAll();
    return res.json(allElements);
  } catch (err) {
    return next(err);
  }
};

const getOneElement = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        error: 'missing id',
      });
    }
    const element = await listService.getOne(id);
    res.status(200).json(element);
  } catch (err) {
    next(err);
  }
};

const createNewElement = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

const updateElement = async (req, res, next) => {
  try {
    const { isCancelled } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'missing id',
      });
    }

    const updatedElement = await listService.updateList(id, isCancelled);
    return res.status(200).json(updatedElement);
  } catch (err) {
    return next(err);
  }
};

const deleteElement = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'missing id',
      });
    }
    listService.deleteElement(id);
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllElements,
  getOneElement,
  updateElement,
  deleteElement,
  createNewElement,
};
