const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProductsSequelize);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProductSequelize);

router.get("/edit-product/:productId", adminController.getEditProductSequelize);

router.post("/edit-product", adminController.postEditProductSequelize);

router.post("/delete-product", adminController.postDeleteProductSequelize);

module.exports = router;
