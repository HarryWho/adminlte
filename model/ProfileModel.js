const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  cover: String,
  skills: {
    type: [String]
  },
  school: String,
  uni: String,
  certificates: {
    type: [String]
  },
  location: String,
  occupation: String,
  followers: Number,
  following: Number,
  friends: Number

});

module.exports = mongoose.model('Profile', ProfileSchema);