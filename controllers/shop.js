const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = async (req, res, next) => {
  const { user } = req;

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: user.cart.products,
  });
};

exports.postCart = async (req, res, next) => {
  const { body, user } = req;

  return Product.findById(body.productId)
    .then((product) => {
      user
        .addToCart(product)
        .then(() => res.redirect("/cart"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

/* 

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
*/
