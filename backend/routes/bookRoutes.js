const express = require('express');
const tourController = require('../controllers/bookController.js');

const router = express.Router();

router.route('/').get(tourController.getAllBooks).post(tourController.createBook);

router.route('/:id').get(tourController.getBook).patch(tourController.updateBook).delete(tourController.deleteBook);

router.route('/:id/synopsis').get(tourController.getSynopsis);

module.exports = router;