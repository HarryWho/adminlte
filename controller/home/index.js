const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

router.get('/', ensureGuest, (req, res) => {
  res.render('home/home', { title: 'Home', pathname: ['home'] })
})

router.get('/dashboard', ensureAuth, (req, res) => {

  res.render('logedin/dashboard', { title: 'Dashboard', user: req.user, pathname: ['home', 'dashboard'] })
})
router.get('/logout', ensureAuth, (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router