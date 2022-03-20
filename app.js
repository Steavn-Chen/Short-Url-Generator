const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-findoneorcreate");
const bodyParser = require("body-parser");
const { getShortUrlGenerator } = require("./tools/generator");

// require('dotenv').config()
// const baseUrl = process.env.baseUrl

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/short-url-generator";
const URL = require("./models/url.js");
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

app.get("/", (req, res) => {
  res.render("index");
});
//  沒有找到就創建，但創建好的資料得 加 .toJSON()，不然會報錯
app.post("/", (req, res) => {
  let error_msg;
  let error_msg1;
  if (req.body.url === "") {
    error_msg = "輸入網址的欄位不能為空，請按此連結";
    return res.render("index", { error_msg: error_msg });
  }
  return URL.aggregate([
    {
      $match: { outputShortUrl: { $gt: "$outputShortUrl" } },
    },
    {
      $project: { _id: 0, __v: 0 },
    },
    {
      $project: {
        inputUrl: "$inputUrl",
        outputShortUrl: "$outputShortUrl",
      },
    },
  ])
    .then((shortData) => {
      const shortUrl = getShortUrlGenerator(shortData, req.body.url);
      if (shortUrl === "短網址產生器無法再產生新的短網址") {
        error_msg1 = shortUrl;
        return res.render("index", { error_msg1: error_msg1 });
      }
      return URL.findOneOrCreate(
        { inputUrl: req.body.url },
        {
          inputUrl: req.body.url,
          outputShortUrl: `localhost:3000/${shortUrl}`,
        }
      )
        .then((url) => {
          return res.render("index", { shortUrl: url.toJSON() });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

app.get("/:short", (req, res) => {
  const params = req.params.short;
  let error_msg;
  if (params === null) {
    return res.redirect("/");
  }
  URL.findOne({ outputShortUrl: `localhost:3000/${params}` })
    .then((result) => {
      if (result === null) {
        error_msg = "此網址錯誤，請按此連結";
        return res.render("index", { error_msg: error_msg });
      }
      return res.redirect(result.inputUrl);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`The web is running http://localhost:${PORT}`);
});
