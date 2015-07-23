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
  res.render('shiz/show', {title: "Showwww me"});
});

//New article page
router.get('/new', function(req, res, next) {
  res.render('shiz/new', {title: "New Article"});
});

//post new article
router.post('/new', function(req, res, next) {
  
  res.redirect('/shiz/show');
});

module.exports = router;
