// Gettign the Newly created Mongoose Model we just created
var Category = require("../models/Category.model");

// Saving the context of this module inside the _the variable
_this = this;

exports.getCategories = async function () {
  // Try Catch the awaited promise to handle the error
  try {
    var categories = await Category.find(
      {},
      {
        title: 1,
        image: 1,
        description: 1,
      }
    );
    return categories;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating categories");
  }
};

exports.createCategory = async function (category) {
  var newCategory = new Category({
    title: category.title,
    created_at: new Date(),
    image: category.image,
    description: category.description,
  });

  try {
    var savedCategory = await newCategory.save();
    return savedCategory;
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error on Create Category");
  }
};
