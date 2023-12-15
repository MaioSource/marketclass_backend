var express = require('express')
var router = express.Router()
var CommentController = require('../../controllers/comment.controller');
var Authorization = require('../../auth/authorization');

router.post('/', CommentController.createComment)
router.get('/', Authorization, CommentController.getComments)
router.put('/:id', Authorization, CommentController.updateComment)
router.delete('/:id', Authorization, CommentController.deleteComment)

// Export the Router
module.exports = router;


