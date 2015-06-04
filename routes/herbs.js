var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Herb = mongoose.model('Herb');

router.get('/', function(req, res, next) {
  Herb.find({}, function(err, herbs) {
    if (err) return console.log(err);
    res.render('herbs/index', {herbs: herbs});
  });
});

router.post('/', function(req, res, next) {
  herb = new Herb({
    name: req.body['herb[name]'],
    oz: req.body['herb[oz]'],
    inStock: req.body['herb[inStock]']
  });

  herb.save(function(err, herb) {
    res.redirect('/herbs')
  })
});

module.exports = router;
