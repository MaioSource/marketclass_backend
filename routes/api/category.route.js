var express = require("express");
var router = express.Router();
var CategoryController = require("../../controllers/category.controller");
var Authorization = require("../../auth/authorization");

router.get("/", CategoryController.getCategories);
router.post("/", Authorization, CategoryController.createCategory);

// Export the Router
module.exports = router;
