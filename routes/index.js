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
  res.render('shiz/show', {title: "Showwww me", allArticles: records});
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





module.exports = router;
