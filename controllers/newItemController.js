const db = require("../db/queries");

const getNewItemForm = (req, res) => {
  res.render("newItem", {
    title: "New Item",
  });
};

const addItem = (req, res) => {
  const { name, category_id, quantity, added_by } = req.body;
  console.log("Adding item:", req.body);
  try {
    db.dbAddItem(name, category_id, quantity, added_by);
    res.redirect("/");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getNewItemForm,
  addItem,
};
