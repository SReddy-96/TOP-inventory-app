const { Router } = require("express");
const newItemRouter = Router();

const { getAllCategories } = require("../middleware/getAllCategories");
const { getNewItemForm, addItem } = require("../controllers/newItemController");

newItemRouter.get("/", [getAllCategories, getNewItemForm]);
newItemRouter.post("/", addItem);

module.exports = newItemRouter;
