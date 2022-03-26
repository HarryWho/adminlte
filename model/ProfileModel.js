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
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }

});

module.exports = mongoose.model('Profile', ProfileSchema);