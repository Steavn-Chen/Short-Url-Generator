const express = require('express')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send(`there`)
})

app.listen(PORT, () => {
  console.log(`The web is running http://localhosy:${PORT}`)
})