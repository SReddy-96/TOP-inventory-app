const { Router } = require("express");
const itemRouter = Router();

const { getAllCategories } = require("../middleware/getAllCategories");
const {
  getNewItemForm,
  addItem,
  getItem,
  deleteItem,
  getUpdateItem,
  postUpdateItem,
} = require("../controllers/itemController");

itemRouter.get("/new", [getAllCategories, getNewItemForm]);
itemRouter.post("/new", [getAllCategories, addItem]);

itemRouter.get("/:id", getItem);
itemRouter.post("/:id/delete", deleteItem);

itemRouter.get("/:id/update", getUpdateItem);
itemRouter.post("/:id/update", [getAllCategories, postUpdateItem]);

module.exports = itemRouter;
