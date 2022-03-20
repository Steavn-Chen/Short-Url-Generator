const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-findoneorcreate");
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

urlSchema.plugin(findOneOrCreate);

module.exports = mongoose.model("URL", urlSchema);
