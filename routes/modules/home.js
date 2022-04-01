const express = require('express')
const router = express.Router()
const { getShortUrlGenerator } = require('../../tools/generator.js')

const BASE_URL = process.env.BASE_URL
const URL = require('../../models/url.js')

router.get('/', (req, res) => {
  res.render('index')
})

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
    .then(shortData => {
      return URL.findOne({ inputUrl: req.body.url })
        .then(url => {
          const shortUrl = getShortUrlGenerator(shortData)
          if (url) {
            return res.render('index', { shortUrl: url.toJSON() })
          }
          if (shortUrl === '') {
            errorMsg1 = '短網址產生器無法再產生新的短網址'
            return res.render('index', { errorMsg1: errorMsg1 })
          }
          return URL.create({
            inputUrl: req.body.url,
            outputShortUrl: `${BASE_URL}/${shortUrl}`
          })
            .then(url => {
              return res.render('index', { shortUrl: url.toJSON() })
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

router.get('/:short', (req, res) => {
  const params = req.params.short
  let errorMsg = ''
  if (params === null) {
    return res.redirect('/')
  }
  URL.findOne({
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