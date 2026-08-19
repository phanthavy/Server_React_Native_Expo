import express = require("express");
import productsController = require("../controllers/product");
import upload = require("../middleware/upload");

const productRouter = express.Router();

productRouter.get("/products", productsController.getProducts);
productRouter.post("/products", upload.single('product_image'), productsController.postProducts);
// productRouter.post('/products')
// productRouter.put('/products/:id')
// productRouter.delete('/products/:id')

module.exports = productRouter;
