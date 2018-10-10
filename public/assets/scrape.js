var request = require("request");
var cheerio = require("cheerio");

//scrape articles from the New YorK Times
var scrape = function(cb) {

var articles = [];

request("https://www.cnn.com/world", function(error, response, html) {

    var $ = cheerio.load(html);
    console.log(html);
      $(".cd__content").each(function(i, element) {

          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children(".cd__content").children(".cd__headline").children("h3").text();
          result.link = $(this).children(".cd__content").children(".cd__headline").children("a").attr("href");
          result.snipText = $(this).children(".cd__content").children(".cd__headline-text").children("a").text();
           console.log("Title=" + result.title);
            console.log("Result Link=" + result.link);
            console.log("Snip Text=" + result.snipText );
            articles.push(result);
          if (result.title !== "" && result.link !== "") {
              articles.push(result);
              console.log("Article :" + articles[1].title);
          }
      });
      cb(articles);
  });

};

        module.exports = scrape;