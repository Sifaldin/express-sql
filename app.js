const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { run } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  User.save(new User("Sayf", "sayfmab@gmail.com", { products: [] }))
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((e) => console.log(e));
});
app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(errorController.get404);

run()
  .then(() => {
    app.listen(3000, () => {
      console.log("listening to port 3000");
    });
  })
  .catch(console.dir);
