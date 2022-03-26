const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  notificationFor: {
    type: mongoose.Schema.Types.ObjectId
  },
  notificationFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notificationMsg: String,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Notification", NotificationSchema)