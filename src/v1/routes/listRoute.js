const express = require('express');
const listController = require('../../controllers/listController');

const router = express.Router();

router.get('/', listController.getAllElements);

router.get('/:id', listController.getOneElement);

router.post('/', listController.createNewElement);

router.patch('/:id', listController.updateElement);

router.delete('/:id', listController.deleteElement);

module.exports = router;
