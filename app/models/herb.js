var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HerbSchema = new Schema({
  name: {type: String, default: ''},
  oz: {type: Number, default: 0},
  inStock: {type: Boolean, default: false}
});

mongoose.model('Herb', HerbSchema);
