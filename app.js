const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require('./routes')
require('./config/mongoose.js')
// require('dotenv').config()
// const baseUrl = process.env.baseUrl
const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes)

app.listen(PORT, () => {
  console.log(`The web is running http://localhost:${PORT}`);
});
