const express = require('express')
const router = express.Router()
// const findOneOrCreate = require("mongoose-findoneorcreate");
const { getShortUrlGenerator } = require("../../tools/generator.js");
const URL = require('../../models/url.js')
const baseUrl = process.env.baseUrl;
router.get("/", (req, res) => {
  res.render("index");
});
//  沒有找到就創建，但創建好的資料得 加 .toJSON()，不然會報錯
router.post("/", (req, res) => {
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
          outputShortUrl: `${baseUrl}/${shortUrl}`,
        }
      )
        .then((url) => {
          return res.render("index", { shortUrl: url.toJSON() });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

router.get("/:short", (req, res) => {
  const params = req.params.short;
  let error_msg;
  if (params === null) {
    return res.redirect("/")
  }
  URL.findOne({ outputShortUrl: `${baseUrl}/${params}` })
    .then((result) => {
      if (result === null) {
        error_msg = "此網址錯誤，請按此連結";
        return res.render("index", { error_msg: error_msg });
      }
      return res.redirect(result.inputUrl);
    })
    .catch((err) => console.error(err));
});

module.exports = router