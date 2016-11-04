const mongoose = require('mongoose');

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

exports.module = mongoose.model('User', UserSchema);
