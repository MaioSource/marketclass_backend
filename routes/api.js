/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var course = require('./api/course.route')
var comment = require('./api/comment.route')
var booking = require('./api/booking.route')
var author = require('./api/author.route')
var category = require('./api/category.route')

router.use('/users', users);
router.use('/course', course);
router.use('/comment', comment)
router.use('/booking', booking)
router.use('/author', author)
router.use('/category', category)

module.exports = router;
