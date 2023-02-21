const itemService = require('../services/itemService');
const Item = require('../models/Item');

const getAllElements = async (req, res, next) => {
  try {
    const allElements = await itemService.getAllElements();
    res.json(allElements);
  } catch (err) {
    next(err);
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
    const item = await itemService.getOneElement(id);
    return res.status(200).json(item);
  } catch (err) {
    return next(err);
  }
};

const createNewElement = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

const updateElement = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: 'missing id',
      });
    }
    const updatedItem = await itemService.updateElement(id);
    return res.json(updatedItem);
  } catch (err) {
    return next(err);
  }
};

const deleteElement = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: 'missing id',
      });
    }
    await itemService.deleteElement(id);
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
