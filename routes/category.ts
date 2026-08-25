import express = require("express");
import controllerCatgory = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.get("/categories", controllerCatgory.getCategory);
categoryRouter.post("/categories", controllerCatgory.postCategory);
categoryRouter.delete("/categories/:id", controllerCatgory.removeCategory);

module.exports = categoryRouter;
