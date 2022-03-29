const express = require('express')
const router = express.Router()
const { getShortUrlGenerator } = require('../../tools/generator.js')

const localUrl = 'http://localhost:3000'
const BASE_URL = process.env.BASE_URL || localUrl

const URL = require('../../models/url.js')
router.get('/', (req, res) => {
  console.log(process.env.PORT)
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('在首頁')
  res.render('index')
})
//  沒有找到就創建，但創建好的資料得 加 .toJSON()，不然會報錯
router.post('/', (req, res) => {
  let errorMsg = ''
  let errorMsg1 = ''
  if (req.body.url === '') {
    errorMsg = '輸入網址的欄位不能為空，請按此連結'
    return res.render('index', { errorMsg: errorMsg })
  }
  return URL.aggregate([
    {
      $match: { outputShortUrl: { $gt: '$outputShortUrl' } }
    },
    {
      $project: { _id: 0, __v: 0 }
    },
    {
      $project: {
        inputUrl: '$inputUrl',
        outputShortUrl: '$outputShortUrl'
      }
    }
  ])
    .then((shortData) => {
      const shortUrl = getShortUrlGenerator(shortData, req.body.url)
      if (shortUrl === '短網址產生器無法再產生新的短網址') {
        errorMsg1 = '短網址產生器無法再產生新的短網址'
        return res.render('index', { errorMsg1: errorMsg1 })
      }
      return URL.findOneOrCreate(
        { inputUrl: req.body.url },
        {
          inputUrl: req.body.url,
          // outputShortUrl: `https://shrot-url-generator.herokuapp.com/${shortUrl}`
          outputShortUrl: `${BASE_URL}/${shortUrl}`
        }
      )
        .then((url) => {
          return res.render('index', { shortUrl: url.toJSON() })
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
})

router.get('/:short', (req, res) => {
  const params = req.params.short
  let errorMsg = ''
  if (params === null) {
    return res.redirect('/')
  }
  URL.findOne({
    // outputShortUrl: `https://shrot-url-generator.herokuapp.com/${params}`
    outputShortUrl: `${BASE_URL}/${params}`
  })
    .then((result) => {
      if (result === null) {
        errorMsg = '此網址錯誤，請按此連結'
        return res.render('index', { errorMsg: errorMsg })
      }
      return res.redirect(result.inputUrl)
    })
    .catch((err) => console.error(err))
})

module.exports = router