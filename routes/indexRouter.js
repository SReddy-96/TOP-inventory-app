const { Router } = require("express");
const { getAllItems } = require("../controllers/indexController");
const { getAllCategories } = require("../middleware/getAllCategories");

const indexRouter = Router();

indexRouter.get("/", [getAllCategories, getAllItems]);

module.exports = indexRouter;
