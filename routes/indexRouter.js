const { Router } = require("express");
const {
  getAllItems,
  getItem,
  getAllItemsByCategory,
  deleteItem,
  getUpdateItem,
  postUpdateItem,
} = require("../controllers/indexController");
const { getAllCategories } = require("../middleware/getAllCategories");

const indexRouter = Router();

indexRouter.get("/", [getAllCategories, getAllItems]);
indexRouter.get("/categories/:id", [getAllCategories, getAllItemsByCategory]);

indexRouter.get("/item/:id", getItem);
indexRouter.post("/item/:id/delete", deleteItem);

indexRouter.get("/item/:id/update", getUpdateItem);
indexRouter.post("/item/:id/update", postUpdateItem);

module.exports = indexRouter;
