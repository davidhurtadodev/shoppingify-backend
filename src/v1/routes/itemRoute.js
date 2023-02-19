const express = require('express');
const itemController = require('../../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getAllItems);

router.get('/:id', itemController.getOneItem);

router.post('/', itemController.createNewItem);

router.patch('/', itemController.updateItem);

router.delete('/', itemController.deleteItem);

module.exports = router;
