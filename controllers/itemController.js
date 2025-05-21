const db = require("../db/queries");

const getNewItemForm = (req, res) => {
  res.render("newItem", {
    title: "New Item",
  });
};

const addItem = async (req, res) => {
  const { name, category_id, quantity, added_by } = req.body;
  try {
    await db.dbAddItem(name, category_id, quantity, added_by);
    res.redirect("/");
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
  getNewItemForm,
  addItem,
  getItem,
  deleteItem,
  getUpdateItem,
  postUpdateItem,
};
