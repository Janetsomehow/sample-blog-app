var express = require('express');
var router = express.Router();

// Require index controller.
var indexController = require('../controllers/indexController');

// when users visit / go to index controller
router.get('/', indexController.index_get);

module.exports = router;
