const db = require("../db/queries");

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
    res.render("index", {
      title: "ShopSort: " + category.name,
      items,
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

const addCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    await db.dbAddCategory(name);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

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

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  try {
    await db.dbUpdateCategory(categoryId, name);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

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
