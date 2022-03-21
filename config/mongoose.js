const  mongoose = require('mongoose')

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/short-url-generator";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose is error')
})

db.once('open', () => {
  console.log('mongoose is connected !')
})