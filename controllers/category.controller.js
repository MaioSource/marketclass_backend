var CategoryService = require("../services/category.service");

// Saving the context of this module inside the _the variable
_this = this;

exports.getCategories = async function (req, res, next) {
  try {
    var Categories = await CategoryService.getCategories();
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Categories,
      message: "Succesfully Categories Recieved",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createCategory = async function (req, res, next) {
  var Category = {
    title: req.body.title,
    created_at: new Date(),
    description: req.body.description,
    image: req.body.image,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var createdCategory = await CategoryService.createCategory(Category);
    return res
      .status(201)
      .json({ createdCategory, message: "Succesfully Created Category" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Category Creation was Unsuccesfull" });
  }
};
