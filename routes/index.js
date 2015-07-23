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
router.get('/:id', function(req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function (err, record) {
  res.render('shiz/more', {theArticle: record});
});
});


// //Update article
// router.get('/albums/:id/update', function(req, res, next) {
//   albumCollection.findOne({_id: req.params.id}, function (err, record) {
//     res.render('albums/edit', {theAlbum: record});
//   });
// });
//
//
// //Update
// router.post('/albums/:id/update', function(req, res, next){
//   albumCollection.update({_id: req.params.id}, { $set: {"name": req.body.new_album, "artist" : req.body.new_artist, "genre": req.body.new_genre, "stars" : req.body.optionsRadios, "lyrics" : req.body.lyrics}})
//   res.redirect('/albums');
// });
//
//
// //Delete
// router.post('/albums/:id', function(req, res, next){
//   albumCollection.remove({_id: req.params.id})
//   res.redirect('/albums');
// });





module.exports = router;
