var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
  },
  description: {
    type: String,
    required: true,
  },
});

CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
