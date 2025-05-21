const { Router } = require("express");
const {
  getAllItems,
  getItem,
  getAllItemsByCategory,
  getAllCategories,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", [getAllCategories, getAllItems]);
indexRouter.get("/categories/:id", [getAllCategories, getAllItemsByCategory]);

indexRouter.get("/item/:id", getItem);

module.exports = indexRouter;
