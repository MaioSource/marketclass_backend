var express = require('express')
var router = express.Router()
var AuthorController = require('../../controllers/author.controller');

router.get('/', AuthorController.getAuthors)

// Export the Router
module.exports = router;