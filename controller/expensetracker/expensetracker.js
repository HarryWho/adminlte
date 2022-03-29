const express = require('express');
const router = express.Router();
const ExpenseTracker = require('../../model/ExpenseTrackerModel')
const { ExpenceTrackerData } = require('../../middleware/DBFunctions')
router.post('/', async(req, res) => {
  const MyTracker = {
    date: req.body.date,
    description: req.body.description,
    debit: req.body.transaction == 'debit' ? req.body.amount : 0,
    credit: req.body.transaction == 'credit' ? req.body.amount : 0
  }
  try {
    const transaction = new ExpenseTracker(MyTracker)
    transaction.save()
    res.send(ExpenseTrackerData(req.user))
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;