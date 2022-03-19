const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/home', { title: 'Home', pathname: ['home'] })
})

router.get('/dashboard', (req, res) => {

  res.render('logedin/dashboard', { title: 'Dashboard', user: req.user, pathname: ['home', 'dashboard'] })
})
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router