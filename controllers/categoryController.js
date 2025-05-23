const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a string."),
];

const showCategories = (req, res) => {
  res.render("categories", {
    title: "ShopSort: Categories",
  });
};

const getAllItemsByCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const { category, items } = await db.dbGetAllItemsByCategory(categoryId);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    const checkedItems = items.filter((item) => item.checked);
    const uncheckedItems = items.filter((item) => !item.checked);

    res.render("index", {
      title: "ShopSort" + category.name,
      checkedItems,
      uncheckedItems,
      category,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const getNewCategoryForm = (req, res) => {
  res.render("newCategory", {
    title: "ShopSort: New Category",
  });
};

const addCategory = [
  validateCategory,
  async (req, res, next) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newCategory", {
        title: "ShopSort: New Category",
        errors: errors.array(),
      });
    }
    try {
      await db.dbAddCategory(name);
      res.redirect("/");
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  },
];

const getUpdateCategoryForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await db.dbGetCategoryById(id);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.render("updateCategory", {
      title: "ShopSort: Update Category",
      category,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const updateCategory = [
  validateCategory,
  async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCategory", {
        title: "ShopSort: Update Category",
        category: { id: categoryId, name },
        errors: errors.array(),
      });
    }
    try {
      await db.dbUpdateCategory(categoryId, name);
      res.redirect("/");
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  },
];

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    await db.dbDeleteCategory(categoryId);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getAllItemsByCategory,
  addCategory,
  getNewCategoryForm,
  updateCategory,
  getUpdateCategoryForm,
  deleteCategory,
  showCategories,
};
