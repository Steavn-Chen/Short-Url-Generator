const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-findoneorcreate");
const findAnyoneOrCreate = require("mongoose-findanyoneorcreate");
// const findOrCreate = require("find-or-create-mongoose");
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  inputUrl: {
    type: String,
    required: true
  },
  outputShortUrl: {
    type: String,
    required: true,
  },
});
// urlSchema.plugin(findOrCreate);
// urlSchema.plugin(findOneOrCreate, findAnyoneOrCreate);
urlSchema.plugin(findOneOrCreate);
// urlSchema.plugin( findAnyoneOrCreate);
module.exports = mongoose.model("URL", urlSchema);
