const URL = require('../url')
const db = require('../../config/mongoose.js')

const localUrl = 'http://localhost:3000'
const BASE_URL = process.env.BASE_URL || localUrl
const shortData = [
  {
    inputUrl: "https://github.com/",
    outputShortUrl: `${BASE_URL}/01234`,
  },
  {
    inputUrl: "https://www.facebook.com",
    outputShortUrl: `${BASE_URL}/abcde`,
  },
  {
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: `${BASE_URL}/ABCDE`,
  },
  {
    inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: `${BASE_URL}/ASDQW`,
  },
]

db.once('open', () => {
  return URL.insertMany(shortData)
  .then(() => {
    console.log(" insert urlSeeder done! ");
    process.exit() })
  .catch(err => console.error(err))
})