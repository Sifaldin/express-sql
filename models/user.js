const { getDb } = require("../util/database");
const mongodb = require("mongodb");

module.exports = class User {
  constructor(name, email, cart) {
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  static async save(user) {
    const db = getDb();
    const existingUser = await db
      .collection("users")
      .find({ email: user.email })
      .next()
      .then((user) => {
        return user;
      });

    if (existingUser) {
      return existingUser;
    }

    return db
      .collection("users")
      .insertOne(user)
      .then((res) => {
        console.log(res);
        return this;
      })
      .catch((e) => console.log(e));
  }

  update(userId) {
    const db = getDb();

    return db
      .collection("users")
      .updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: this })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((e) => console.log(e));
  }

  static delete(userId) {
    const db = getDb();

    return db
      .collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
      })
      .catch((e) => console.log(e));
  }

  addToCart(product) {
    const db = getDb();

    const products = this.cart.products;

    return db.collection("users").updateOne(
      { email: this.email },
      {
        $set: {
          cart: {
            products: products.find(
              (existingProduct) => existingProduct.title === product.title
            )
              ? products.map((existingProduct) =>
                  existingProduct.title === product.title
                    ? {
                        ...existingProduct,
                        quantity: existingProduct.quantity + 1,
                      }
                    : existingProduct
                )
              : products.push({ ...product, quantity: 1 }),
          },
        },
      }
    );
  }
};
