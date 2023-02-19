const express = require('express');
const itemController = require('../../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getAllElements);

router.get('/:id', itemController.getOneElement);

router.post('/', itemController.createNewElement);

router.patch('/', itemController.updateElement);

router.delete('/', itemController.deleteElement);

module.exports = router;
