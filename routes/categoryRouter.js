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
  showCategories,
} = require("../controllers/categoryController");
const { checkAdminPassword } = require("../middleware/checkAdminPassword");

categoryRouter.get("/", [getAllCategories, showCategories]);

categoryRouter.get("/new", getNewCategoryForm);
categoryRouter.post("/new", addCategory);

categoryRouter.get("/:id", [getAllCategories, getAllItemsByCategory]);

categoryRouter.get("/:id/update", getUpdateCategoryForm);
categoryRouter.post("/:id/update", [checkAdminPassword, updateCategory]);

categoryRouter.post("/:id/delete", [checkAdminPassword, deleteCategory]);

module.exports = categoryRouter;
