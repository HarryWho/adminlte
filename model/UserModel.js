const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/dist/img/avatar.png'
  },
  password: {
    type: String

  },
  joined: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'basic'
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Settings'
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }]

})

module.exports = mongoose.model('User', UserSchema)