import express = require("express");
import productsController = require("../controllers/product");

const productRouter = express.Router();

productRouter.get("/products", productsController.getProducts);
productRouter.post("/products", productsController.postProducts);
// productRouter.post('/products')
// productRouter.put('/products/:id')
// productRouter.delete('/products/:id')

module.exports = productRouter;
