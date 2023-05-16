const { getDb } = require("../util/database");
const mongodb = require("mongodb");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();

    return db
      .collection("products")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  update(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: this })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((e) => console.log(e));
  }

  static findById(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((e) => console.log(e));
  }

  static delete(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        console.log(product);
      })
      .catch((e) => console.log(e));
  }
};
