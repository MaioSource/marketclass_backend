// Gettign the Newly created Mongoose Model we just created
var Course = require("../models/Course.model");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the User List
exports.getCourse = async function (params) {
  // Try Catch the awaited promise to handle the error
  try {
    var domain = { _id: params.courseId, state: 'published'};
    if (params.userId) {
      domain.author = params.userId;
      domain.state = ['published', 'unpublished']
    }
    var course = await Course.find(domain)
      .populate("author", "name")
      .populate("category", "title")
      .populate({
        path: "comments",
        select: "name rating description created_at",
        match: { state: domain.state },
      });
    return course;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Get Course");
  }
};

exports.getCourses = async function (params) {
  try {
    var domain = { state: 'published'};
    if (params.userId) {
      domain.author = params.userId;
      domain.state = params.state
    }
    if (params.category){
      domain.category = params.category
    }
    if (params.frequency){
      domain.frequency = params.frequency
    }
    if (params.type){
      domain.type = params.type
    }
    if (params.avg_rating){
      domain.avg_rating = params.avg_rating
    }

    var courses = await Course.find(domain)
      .populate("author", "name")
      .populate("category")
      .populate({
        path: "comments",
        select: "name rating description created_at",
        match: { state: domain.state },
      });
    return courses;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Get Course");
  }
};

exports.createCourse = async function (course) {
  var newCourse = new Course({
    title: course.title,
    type: course.type,
    created_at: new Date(),
    category: course.category,
    duration: course.duration,
    frequency: course.frequency,
    author: course.author,
    image: course.image,
    description: course.description,
    price: course.price,
    requirements: course.requirements,
  });

  try {
    var savedCourse = await newCourse.save();
    return savedCourse;
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error on Create Course");
  }
};

exports.updateCourse = async function (course) {
  try {
    var domain = {
      _id: course._id,
      author: course.userId,
    };
    var oldCourse = await Course.findOne(domain);
  } catch (e) {
    throw Error("Error occured while Finding the Course");
  }

  if (!oldCourse) {
    throw Error("Error occured while Finding the Course");
  }
  oldCourse.title = course.title || oldCourse.title;
  oldCourse.type = course.type || oldCourse.type;
  oldCourse.updated_at = course.updated_at;
  oldCourse.category = course.category || oldCourse.category;
  oldCourse.duration = course.duration || oldCourse.duration;
  oldCourse.frequency = course.frequency || oldCourse.frequency;
  oldCourse.image = course.image || oldCourse.image;
  oldCourse.description = course.description || oldCourse.description;
  oldCourse.price = course.price || oldCourse.price;
  oldCourse.requirements = course.requirements || oldCourse.requirements;
  oldCourse.state = course.state || oldCourse.state;

  try {
    var savedCourse = await oldCourse.save();
    return savedCourse;
  } catch (e) {
    throw Error("And Error occured while updating the Course" + e);
  }
};

exports.deleteCourse = async function (course) {
  // Try Catch the awaited promise to handle the error
  try {
    var domain = {
      _id: course._id,
      author: course.userId,
    };
    var course = await Course.findOneAndDelete(domain);
    return course;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Delete Course");
  }
};
