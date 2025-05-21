const db = require("../db/queries");

const getAllItems = async (req, res, next) => {
  try {
    const items = await db.dbGetAllItems();
    res.render("index", {
      title: "ShopSort",
      items,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const getItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await db.dbGetItem(itemId);
    // if no item return 404 with error middleware
    if (!item) {
      const err = new Error("Item not found");
      err.statusCode = 404;
      return next(err);
    }
    // get items category, if empty it will return null, Don't query if already empty
    if (!item.category_id) {
      return res.render("item", {
        title: "ShopSort:" + item.name,
        item,
        itemCategory: null,
      });
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

const postUpdateItem = async (req, res, next) => {
  const itemId = req.params.id;
  const { name, category_id, quantity, added_by } = req.body;
  try {
    await db.dbUpdateItem(itemId, name, category_id, quantity, added_by);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

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
}

module.exports = {
  getAllItems,
  getItem,
  getAllItemsByCategory,
  deleteItem,
  getUpdateItem,
  postUpdateItem,
};
