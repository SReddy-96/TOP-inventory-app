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
  toggleCheckedItem,
} = require("../controllers/itemController");
const { checkAdminPassword } = require("../middleware/checkAdminPassword");

itemRouter.get("/new", [getAllCategories, getNewItemForm]);
itemRouter.post("/new", [getAllCategories, addItem]);

itemRouter.get("/:id", getItem);
itemRouter.post("/:id/delete", [checkAdminPassword, deleteItem]);

itemRouter.get("/:id/update", getUpdateItem);
itemRouter.post("/:id/update", [
  checkAdminPassword,
  getAllCategories,
  postUpdateItem,
]);

itemRouter.post("/:id/checked", toggleCheckedItem);

module.exports = itemRouter;
