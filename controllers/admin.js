const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.addProduct = (req, res, next) => {
  const { body } = req;

  const product = new Product(
    body.title,
    body.imageUrl,
    body.description,
    body.price
  );

  product
    .save(product)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const { body } = req;

  const updatedProduct = new Product(
    body.title,
    body.imageUrl,
    body.description,
    body.price
  );

  updatedProduct
    .update(body.prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete(prodId);
  res.redirect("/admin/products");
};
