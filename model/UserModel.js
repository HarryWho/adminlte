const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    type: String,
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'basic'
  }

})

module.exports = mongoose.model('User', UserSchema)