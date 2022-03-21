const URL = require('../url')
const db = require('../../config/mongoose.js')

const shortData = [
  {
    inputUrl: "https://github.com/",
    outputShortUrl: 'localhost:3000/00',
  },
  {
    inputUrl: "https://www.facebook.com",
    outputShortUrl: "localhost:3000/11",
  },
  {
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: "localhost:3000/01",
  },
  {
    inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: "localhost:3000/10",
  },
];

db.once('open', () => {
  return URL.insertMany(shortData)
  .then(() => {
    console.log(" insert urlSeeder done! ");
    process.exit() })
  .catch(err => console.error(err))
})