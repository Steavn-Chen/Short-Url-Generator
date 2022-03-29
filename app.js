const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose.js')
// require('dotenv').config()
// if (process.env.NODE_ENV === "production") {
//   require("dotenv").config();
// }
const app = express()
const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`The Short-URL-Generator web is running ${BASE_URL}:${PORT}`)
});
