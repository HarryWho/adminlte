const mongoose = require('mongoose')

const ExpenseTrackerSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  debit: {
    type: Number,
    get: v => (v / 100).toFixed(2),
    set: v => v * 100
  },
  credit: {
    type: Number,
    get: v => (v / 100).toFixed(2),
    set: v => v * 100
  }
}, {
  toJSON: { getters: true } //this right here
})

module.exports = mongoose.model('ExpenseTracker', ExpenseTrackerSchema)