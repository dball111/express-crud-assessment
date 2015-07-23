var express = require('express');
var router = express.Router();

var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/article-db');
var articleCollection = db.get('article');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assess This!' });
});


//Show Page
router.get('/show', function(req, res, next) {
  articleCollection.find({}, function (err, records) {
  res.render('shiz/show', {title: "The Zine", allArticles: records});
});
});

//New article page
router.get('/new', function(req, res, next) {
  res.render('shiz/new', {title: "New Article"});
});

//post new article
router.post('/new', function(req, res, next) {
  articleCollection.insert({
    name: req.body.article_title,
    url: req.body.article_url,
    excerpt: req.body.article_excerpt,
    colors: req.body.article_colors,
    body: req.body.article_body
    });
  res.redirect('/show');
});


//show complete article
router.get('/more/:id', function(req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function (err, record) {
  res.render('shiz/more', {theArticle: record});
});
});


//Update article
router.get('/more/:id/update', function(req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('shiz/edit', {theArticle: record});
  });
});


//Update
router.post('/more/:id/update', function(req, res, next){
  articleCollection.update({_id: req.params.id}, { $set:
    {  "name": req.body.article_title,
      "url": req.body.article_url,
      "excerpt": req.body.article_excerpt,
      "colors": req.body.article_colors,
      "body": req.body.article_body
    }})
  res.redirect('/show');
});


//Delete
router.post('/more/:id', function(req, res, next){
  articleCollection.remove({_id: req.params.id})
  res.redirect('/show');
});





module.exports = router;
