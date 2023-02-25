const express = require('express');
const categoryController = require('../../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllElements);

router.get('/:id', categoryController.getOneElement);

router.post('/', categoryController.createNewElement);

router.patch('/:id', categoryController.updateElement);

router.delete('/:id', categoryController.deleteElement);

module.exports = router;
