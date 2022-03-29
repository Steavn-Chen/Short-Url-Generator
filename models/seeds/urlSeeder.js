const URL = require('../url')
const db = require('../../config/mongoose.js')
// const shortData = [
//   {
//     inputUrl: "https://github.com/",
//     outputShortUrl: `${base_url}/01234`,
//   },
//   {
//     inputUrl: "https://www.facebook.com",
//     outputShortUrl: `${base_url}/abcde`,
//   },
//   {
//     inputUrl: "https://www.yahoo.com.tw",
//     outputShortUrl: `${base_url}/ABCDE`,
//   },
//   {
//     inputUrl: "https://www.pchome.com.tw",
//     outputShortUrl: `${base_url}/ASDQW`,
//   },
// ];
// const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost'
const localUrl = BASE_URL + ':3000'
const shortData = [
  {
    inputUrl: "https://github.com/",
    outputShortUrl: `${localUrl}/01234`,
  },
  {
    inputUrl: "https://www.facebook.com",
    outputShortUrl: `${localUrl}/abcde`,
  },
  {
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: `${localUrl}/ABCDE`,
  },
  {
    inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: `${localUrl}/ASDQW`,
  },
];

db.once('open', () => {
  return URL.insertMany(shortData)
  .then(() => {
    console.log(" insert urlSeeder done! ");
    process.exit() })
  .catch(err => console.error(err))
})