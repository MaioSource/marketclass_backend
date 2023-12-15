var CourseService = require("../services/course.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getById = async function (req, res, next) {
  try {
    var domain = {
      userId: req.userId,
      courseId: req.params.id,
      state: req.query.state
    };
    var Course = await CourseService.getCourse(domain);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res
      .status(200)
      .json({
        status: 200,
        data: Course,
        message: "Succesfully Course Recieved",
      });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getCourses = async function (req, res, next) {
  try {
    var domain = {
      userId: req.userId,
      state: req.query.state
    };
    if (req.query.category){
      domain.category = req.query.category
    }
    if (req.query.frequency){
      domain.frequency = req.query.frequency
    }
    if (req.query.type){
      domain.type = req.query.type
    }
    if (req.query.avg_rating){
      domain.avg_rating = req.query.avg_rating
    }
    var Courses = await CourseService.getCourses(domain);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res
      .status(200)
      .json({
        status: 200,
        data: Courses,
        message: "Succesfully Course Recieved",
      });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createCourse = async function (req, res, next) {
  var Course = {
    title: req.body.title,
    type: req.body.type,
    created_at: new Date(),
    category: req.body.category,
    duration: req.body.duration,
    frequency: req.body.frequency,
    author: req.userId,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    requirements: req.body.requirements,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var createdCourse = await CourseService.createCourse(Course);
    return res
      .status(201)
      .json({ createdCourse, message: "Succesfully Created Course" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Course Creation was Unsuccesfull" });
  }
};

exports.updateCourse = async function (req, res, next) {
  var Course = {
    title: req.body.title ? req.body.title : null,
    type: req.body.type ? req.body.type : null,
    updated_at: new Date(),
    category: req.body.category ? req.body.category : null,
    duration: req.body.duration ? req.body.duration : null,
    frequency: req.body.frequency ? req.body.frequency : null,
    image: req.body.image ? req.body.image : null,
    description: req.body.description ? req.body.description : null,
    price: req.body.price ? req.body.price : null,
    requirements: req.body.requirements ? req.body.requirements : null,
    state: req.body.state ? req.body.state : null,
    _id: req.params.id,
    userId: req.userId,
  };

  try {
    var updatedCourse = await CourseService.updateCourse(Course);
    return res
      .status(200)
      .json({ status: 200, message: "Succesfully Updated Course" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.deleteCourse = async function (req, res, next) {
  var Course = {
    _id: req.params.id,
    userId: req.userId,
  };
  try {
    var deletedCourse = await CourseService.deleteCourse(Course);
    return res
      .status(200)
      .json({ status: 200, message: "Succesfully Deleted Course" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
