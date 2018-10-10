var scrape = require("../public/assets/scrape");
var Article = require("../models/Article");

module.exports = {
  fetch: function(cb) {

    scrape(function(data) {

      var articles = data;
      console.log("Article Array=" + articles[0].title);
      
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = new Date();
        articles[i].saved = false;
        articles[i].note = [];
      }
 Article.collection.insertMany(articles, { ordered: false }, function(err, doc) {
          cb(err, doc);
        });
    });
  },
  get: function(query, cb) {
    Article.find(query)
      .sort({_id: -1})
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  update: function(query, cb) {
    Article.update({ _id: query.id }, {
      $set: {saved: query.saved}
    }, {}, cb);
  },
  addNote: function(query, cb) {
    Article.findOneAndUpdate({_id: query.id }, {
      $push: {note: query.note}
    }, {}, cb);
  }
};