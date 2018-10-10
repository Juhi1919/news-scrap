
var scrape = require("../public/assets/scrape");
var Article = require("../models/Article");
var Note = require("../models/Note");
var articles_con = require("../controllers/articles");
var notes_con = require("../controllers/notes");


module.exports = function(router) {


    router.get("/", function(req, res) {
        Article.find({saved: false}, function(error, find) {
            if (error) {
                console.log(error);
            } else if (find.length === 0) {
                res.render("")
            } else {
  
              var handleObject = {
                  articles: find
              };
              res.render("index", handleObject);
  
            }
        });
    });
  
    router.get("/api/fetch", function(req, res) {
  
        // scrapes articles and saves to database
        articles_con.fetch(function(err, doc) {
            
            if (!doc || doc.insertedCount === 0) {
                res.json({message: "No new articles...."});
            }
            else {
                res.json({message: "Add " + doc.insertedCount + " all articles!"});
            }
  
        });
    });
  
    //retrieves the saved articles
    router.get("/savedarticle", function(req, res) {
  
        articles_con.get({saved: true}, function(data) {
            var handleobj = {
              articles: data
            };
            res.render("savedarticle", handleobj);
        });
    });

    router.patch("/api/articles", function(req, res) {
  
        articles_con.update(req.body, function(err, data) {
            res.json(data);
        });
    });
  
    //getting the notes for saved articles
    router.get('/notes/:id', function (req, res) {
       
        Article.findOne({_id: req.params.id})
            .populate("note") 
            .exec(function (error, doc) { 
                if (error) console.log(error);
                
                else {
                    res.json(doc);
                }
            });
    });
  
    // Add a note for saved article
    router.post('/notes/:id', function (req, res) {
        var newNote = new Note(req.body);
        newNote.save(function (err, doc) {
            if (err) {console.log(err);}
            Article.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {note: doc._id}},
                {new: true},
                function(err, newdoc){
                    if (err) console.log(err);
                    res.send(newdoc);
            });
        });
    });
  
    router.get('/deleteNote/:id', function(req, res){
        Note.remove({"_id": req.params.id}, function(err, newdoc){
            if(err) console.log(err);
            res.redirect('/savedarticle'); 
        });
    });
  
  };