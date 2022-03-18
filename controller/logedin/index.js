const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('logedin/dashboard', { title: 'Dashboard', user: req.user, pathname: ['home', 'dashboard'] })
})



module.exports = router