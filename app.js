const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const findOneOrCreate = require("mongoose-findoneorcreate");
const findAnyoneOrCreate = require("mongoose-findanyoneorcreate");
// const findOrCreate = require("find-or-create-mongoose");
// mongoose.plugin(findOrCreate);
const bodyParser = require('body-parser')
const { getShortUrlGenerator } = require("./tools/generator");

// require('dotenv').config()
// const baseUrl = process.env.baseUrl 

const app = express()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/short-url-generator'
const URL = require('./models/url.js')
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

// mongoose.set("useFindAndModify", false);

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
  // console.log('process',process.env)
  res.render('index')
})
//  沒有找到就創建，但創建好的資料得 加 .toJSON()，不然會報錯
app.post('/', (req, res) => {
  console.log('req.url.',req.body.url)
  let error_msg
  let error_msg1
  if (req.body.url === '') {
    error_msg = "輸入網址的欄位不能為空，請按此連結";
    return res.render("index", { error_msg: error_msg });
  }
  // 第一種寫法 findOrCreate
  // return URL.find()
  return URL.aggregate([
    {
      $match: { outputShortUrl: { $gt: "$outputShortUrl" } },
      // $match: { outputShortUrl: { $gt: "z" } },
    },
    {
      // project: {
      // outputShortUrl: "$outputShortUrl",
      // shortString: "$outputShortUrl",
      // },
      // $project: { _id: 0, inputUrl: 0, __v: 0 },
      $project: { _id: 0, __v: 0 },
    },
    {
      $project: {
        inputUrl: "$inputUrl",
        shortString: "$outputShortUrl",
        outputShortUrl: "$outputShortUrl",
      },
    },
  ])
    .then((shortData) => {
      console.log("這是在外面", shortData);
      // console.log("front", shortData);
      // shortData.some((i,index)=> {
      //   console.log(index,i)
      //   return i.shortString !== getShortUrlGenerator();
      // })
      const shortUrl = getShortUrlGenerator(shortData, req.body.url);
      console.log("~~~~~~~~~~~~~");
      console.log("在路由了", shortUrl);
      console.log("~~~~~~~~~~~~~~~~~~~");

      if (shortUrl === "短網址產生器無法再產生新的短網址") {
        error_msg1 = shortUrl;
        return res.render("index", { error_msg1: error_msg1 });
        // return res.redirect("/");
      }

      if (
        shortUrl.message ===
        "無法再產生新的字串，而且使用者輸入的字串在資料庫得回傳"
      ) {
        console.log("無法再產生新的字串，而且使用者輸入的字串在資料庫得回傳");
        console.log("shortUrl", shortUrl);
        return res.render("index", { shortUrl: shortUrl });
      }
      return URL.findOneOrCreate(
        { inputUrl: req.body.url },
        {
          inputUrl: req.body.url,
          // { inputUrl: req.body.url, outputShortUrl: 'localhost:3000/1'
          // outputShortUrl: `localhost:3000/${getShortUrlGenerator()}`
          outputShortUrl: `localhost:3000/${shortUrl}`,
        }
      )
        .then((url) => {
          console.log("==========================");
          console.log("after", url);
          return res.render("index", { shortUrl: url.toJSON() });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

  //目前行不通 
  // URL.findOneOrCreate(
  //   { inputUrl: req.body.url },
  //   { inputUrl: req.body.url, 
  //     outputShortUrl: `localhost:3000/${getShortUrlGenerator()}`,
  // }
  // )
  // .then(data => {
  //   console.log('before', data)
  //   URL.aggregate([
  //     {
  //       $project: { _id: 0, inputUrl: 0, __v: 0},
  //     },
  //   ])
  //     .then((result) => {
  //       console.log("back", result);
  //       res.render("index", { shortUrl: result.toJSON() });
  //     })
  //     .catch((err) => console.error(err));
  // })
  // .catch(err => console.error(err))
     
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
  let error_msg
  console.log('params',params);
  // console.log(`${baseUrl}/${params}`);
  console.log(`localhost:3000/${params}`)
  if (params === null) {
    return res.redirect('/')
  }
   URL.findOne({ outputShortUrl: `localhost:3000/${params}` })
   .then((result) => {
     console.log("result", result);
     if (result === null) {
      //  error_msg = '此網址無效'
      error_msg = '此網址錯誤，請按此連結';
       return res.render("index", { error_msg: error_msg });
     }
     // URL.findOne({ url: `https://shrot-url-generator.herokuapp.com/${params}` }).then((result) => {
     //   console.log(result);
     // res.redirect('/')
     res.redirect(result.inputUrl);
   })
   .catch(err => console.error(err))
});

app.listen(PORT, () => {
  console.log(`The web is running http://localhost:${PORT}`)
})