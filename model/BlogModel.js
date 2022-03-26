const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blog: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Like'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Blog', BlogSchema)