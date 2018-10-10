// Require mongoose
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Create Note schema
var NoteSchema = new Schema({
  title: String,
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
