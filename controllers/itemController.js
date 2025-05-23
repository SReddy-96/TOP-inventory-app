const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItem = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a string."),
  body("quantity")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1.")
    .toInt(),
  body("added_by")
    .trim()
    .notEmpty()
    .withMessage("Added by is required.")
    .isAlpha()
    .withMessage("Added by must be a string."),
  body("category_id")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isInt()
    .toInt(),
];

const getNewItemForm = (req, res) => {
  res.render("newItem", {
    title: "New Item",
  });
};

const addItem = [
  validateItem,
  async (req, res, next) => {
    const { name, category_id, quantity, added_by } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newItem", {
        title: "New Item",
        errors: errors.array(),
      });
    }
    try {
      await db.dbAddItem(name, category_id, quantity, added_by);
      res.redirect("/");
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  },
];

const getItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await db.dbGetItem(itemId);
    // if no item return 404 with error middleware
    if (!item) {
      const err = new Error("Item not found");
      err.statusCode = 404;
      return next(err);
    } else {
      const itemCategory = await db.dbGetItemCategory(item.category_id);
      res.render("item", {
        title: "ShopSort:" + item.name,
        item,
        itemCategory,
      });
    }
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    await db.dbDeleteItem(itemId);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const postUpdateItem = [
  validateItem,
  async (req, res, next) => {
    const itemId = req.params.id;
    const { name, category_id, quantity, added_by } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.dbGetAllCategories();
      return res.status(400).render("updateItem", {
        title: "Update Item",
        item: { id: itemId, ...req.body },
        categories,
        errors: errors.array(),
      });
    }

    try {
      await db.dbUpdateItem(itemId, name, category_id, quantity, added_by);
      res.redirect("/");
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  },
];

const getUpdateItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await db.dbGetItem(itemId);
    if (!item) {
      const err = new Error("Item not found");
      err.statusCode = 404;
      return next(err);
    }
    const categories = await db.dbGetAllCategories();
    res.render("updateItem", {
      title: "ShopSort: " + item.name,
      item,
      categories,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const toggleCheckedItem = async (req, res, next) => {
  const itemId = req.params.id;
  const categoryId = req.query.categoryId;
  try {
    const item = await db.dbToggleChecked(itemId);
    if (!item) {
      const err = new Error("Item not found");
      err.statusCode = 404;
      return next(err);
    }
    // Redirect back to category page if categoryId exists
    const redirectUrl = categoryId ? `/categories/${categoryId}` : "/";
    res.redirect(redirectUrl);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getNewItemForm,
  addItem,
  getItem,
  deleteItem,
  getUpdateItem,
  postUpdateItem,
  toggleCheckedItem,
};
