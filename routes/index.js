var express = require('express');
var router = express.Router();

let main = require('./main');

router.use('/', main);

module.exports = router;
