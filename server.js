var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var Note = require("./models/Note.js");

var Article = require("./models/Article.js");
mongoose.Promise = Promise;

// Express
var app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(process.cwd() + "/public"));
app.use(express.static("public"));
// Database with mongoose
var MONGODB_URI= process.env.MONGODB_URI || 'mongodb://localhost:27017/CnnScrape';

 mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection sucessful.");
});

//set engine for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes 
var router = express.Router();
require("./controllers/routes")(router);

app.use(router);

//port
var port = process.env.PORT || 3030;

app.listen(port, function() {
  console.log("app running on port " + port);
});