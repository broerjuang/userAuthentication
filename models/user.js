const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email : {
    type : String,
    unique : true,
    required : true,
    trim : true
  },
  name : {
    type : String,
    required : true,
    trim : true
  },
  favoriteBook : {
    type : String,
    required : true,
    trim : true
  },
  password : {
    type : String,
    required : true
  }
});

// hash passport before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);
