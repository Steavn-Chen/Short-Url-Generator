const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const findOrCreate = require("find-or-create-mongoose");
// mongoose.plugin(findOrCreate);
const bodyParser = require('body-parser')
const { getShortUrl } = require('./tools/generator')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/short-url-generator'
const URL = require('./models/url.js')
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb is error!')
})

db.once('open', () => {
  console.log('mongodb is connected.')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
//  沒有找到就創建，但創建好的資料得 加 .toJSON()，不然會報錯
app.post('/', (req, res) => {
  let error_msg
  if (req.body.url === '') {
    error_msg = '請輸入網址'
    return res.render("index", { error_msg: error_msg });
  }
  // 第一種寫法 findOrCreate
  URL.findOrCreate({ name: req.body.url }, { name: req.body.url, url: getShortUrl() })
    .then((result) => {
      res.render("index", { shortUrl: result[0].toJSON() });
    })
    .catch(err => console.error(err))

  // 第二種寫法
  // return URL.findOne({ name: req.body.url})
  // .lean()
  // .then(url => {
  //   if (!url) {
  //     return URL.create({
  //       name: req.body.url,
  //       url: getShortUrl()
  //     })
  //     .then((url) => res.render("index", { shortUrl: url.toJSON() }))
  //     .catch((err) => console.error(err));
  //   }
  //   return res.render("index", { shortUrl: url })
  // })
  // .catch(err => console.error(err))
})

// app.get("/shrot-url-generator/herokuapp.com/:short", (req, res) => {
//   const params = req.params.short;
//   console.log(params);
//   URL.findOne({ url: `https://shrot-url-generator/herokuapp.com/${params}` }).then((result) => {
//     console.log(result);
//     res.redirect(result.name);
//   });

app.get("/:short", (req, res) => {
  const params = req.params.short;
  console.log(params);
  URL.findOne({ url: `https://shrot-url-generator.herokuapp.com/${params}` }).then((result) => {
    console.log(result);
    // res.redirect('/')
    res.redirect(result.name);
  });
});

app.listen(PORT, () => {
  console.log(`The web is running http://localhost:${PORT}`)
})