// Require mongoose
var mongoose = require("mongoose");

// Save a reference to the Schema constructor

var Schema = mongoose.Schema;
// Create article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  snipText:{
    type: String
  },
  // saves note's ObjectId, ref refers to the Note model
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});
// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;