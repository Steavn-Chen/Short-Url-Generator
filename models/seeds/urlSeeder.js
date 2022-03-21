const URL = require('../url')
const db = require('../../config/mongoose.js')
const shortData = [
  {
    inputUrl: "https://github.com/",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/01234`,
  },
  {
    inputUrl: "https://www.facebook.com",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/abcde`,
  },
  {
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/ABCDE`,
  },
  {
    inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/ASDQW`,
  },
];

db.once('open', () => {
  return URL.insertMany(shortData)
  .then(() => {
    console.log(" insert urlSeeder done! ");
    process.exit() })
  .catch(err => console.error(err))
})