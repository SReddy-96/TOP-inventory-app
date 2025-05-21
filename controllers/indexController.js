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

module.exports = {
  getAllItems,
};
