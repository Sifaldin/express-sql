const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/add-product", adminController.getAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/add-product", adminController.addProduct);

router.post("/edit-product", adminController.editProduct);

router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
