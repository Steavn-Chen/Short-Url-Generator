const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-findoneorcreate");
const bodyParser = require("body-parser");
const routes = require('./routes')

// require('dotenv').config()
// const baseUrl = process.env.baseUrl

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/short-url-generator";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb is error!");
});

db.once("open", () => {
  console.log("mongodb is connected.");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes)

app.listen(PORT, () => {
  console.log(`The web is running http://localhost:${PORT}`);
});
