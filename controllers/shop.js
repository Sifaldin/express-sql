const Product = require("../models/product");
const Cart = require("../models/cart");
const Item = require("../models/product-sequel");
const CartItem = require("../models/cart-item");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([row, fieldData]) => {
      res.render("shop/product-detail", {
        product: row[0],
        pageTitle: row[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// ---------- SEQUELIZE IMPLEMENTATION ---------

exports.getProductsSequelize = async (req, res, next) => {
  const user = req.user;
  const products = await user.getItems();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProductSequelize = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Item.findByPk(prodId);
  res.render("shop/product-detail", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndexSequelize = async (req, res, next) => {
  const user = req.user;
  const products = await user.getItems();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = async (req, res, next) => {
  const user = req.user;
  const cart = await user.getCart();

  cart
    .getItems()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  const cart = await user.getCart();
  const product = await Item.findByPk(prodId);
  const products = await cart.getItems({ where: { id: prodId } });
  const prevQuanittiy =
    products && products.length > 0 ? products[0].cartItem.quantity : null;

  return cart
    .addItems(product, {
      through: {
        quantity: prevQuanittiy ? prevQuanittiy + 1 : 1,
      },
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  const cart = await user.getCart();

  return cart
    .getItems({ where: { id: prodId } })
    .then((products) => products[0].cartItem.destroy())
    .then(() => res.redirect("/cart"))
    .catch((e) => console.log(e));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
