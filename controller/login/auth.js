const express = require('express')
const router = express.Router();
const passport = require('passport')
const GoogleStrategy = require('../../config/passportGoogle')


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.

    res.redirect('/dashboard');
  });


module.exports = router