const mongoose = require('mongoose')
const findOrCreate = require("find-or-create-mongoose");
const Schema = mongoose.Schema
const urlSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
})
urlSchema.plugin(findOrCreate);
module.exports = mongoose.model('URL', urlSchema)