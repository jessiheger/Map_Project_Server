var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination'}]
}, {
  usePushEach: true
});


module.exports = mongoose.model('Trip', tripSchema);
