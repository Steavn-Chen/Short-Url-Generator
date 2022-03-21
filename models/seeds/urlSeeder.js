const URL = require('../url')
const db = require('../../config/mongoose.js')
const baseUrl = process.env.baseUrl;
const shortData = [
  {
    inputUrl: "https://github.com/",
    outputShortUrl: `${baseUrl}/01234`,
  },
  {
    inputUrl: "https://www.facebook.com",
    outputShortUrl: `${baseUrl}/abcde`,
  },
  {
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: `${baseUrl}/ABCDE`,
  },
  {
    inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: `${baseUrl}/ASDQW`,
  },
];

db.once('open', () => {
  return URL.insertMany(shortData)
  .then(() => {
    console.log(" insert urlSeeder done! ");
    process.exit() })
  .catch(err => console.error(err))
})