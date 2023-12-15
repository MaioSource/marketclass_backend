var express = require('express')
var router = express.Router()
var CourseController = require('../../controllers/course.controller');
var Authorization = require('../../auth/authorization');

router.get('/my/:id', Authorization, CourseController.getById)
router.get('/my/', Authorization, CourseController.getCourses)
router.get('/:id', CourseController.getById)
router.get('/', CourseController.getCourses)
router.post('/', Authorization, CourseController.createCourse)
router.put('/:id', Authorization, CourseController.updateCourse)
router.delete('/:id', Authorization, CourseController.deleteCourse)

// Export the Router
module.exports = router;


