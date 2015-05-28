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

module.exports = router;
