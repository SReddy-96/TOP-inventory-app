const db = require("../db/queries");
// middleware to get all categories. saving to res.locals
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await db.dbGetAllCategories();
    res.locals.categories = categories;
    next();
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  getAllCategories,
};
