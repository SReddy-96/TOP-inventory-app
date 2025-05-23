const db = require("../db/queries");

const getAllItems = async (req, res, next) => {
  try {
    const items = await db.dbGetAllItems();
    const checkedItems = items.filter((item) => item.checked);
    const uncheckedItems = items.filter((item) => !item.checked);

    res.render("index", {
      title: "ShopSort",
      checkedItems,
      uncheckedItems,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getAllItems,
};
