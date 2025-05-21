const { Router } = require("express");

const categoryRouter = Router();

const { getAllCategories } = require("../middleware/getAllCategories");
const {
  getAllItemsByCategory,
  getNewCategoryForm,
  addCategory,
  getUpdateCategoryForm,
  updateCategory,
  deleteCategory,
  showCategories
} = require("../controllers/categoryController");

categoryRouter.get("/", [getAllCategories, showCategories]);

categoryRouter.get("/new", getNewCategoryForm);
categoryRouter.post("/new", addCategory);

categoryRouter.get("/:id", [getAllCategories, getAllItemsByCategory]);

categoryRouter.get("/:id/update", getUpdateCategoryForm);
categoryRouter.post("/:id/update", updateCategory);

categoryRouter.post("/:id/delete", deleteCategory);

module.exports = categoryRouter;
