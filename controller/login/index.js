const express = require('express')
const router = express.Router();
const passport = require('passport')
const { ValidateRegister } = require('../../middleware/validate')
const bcrypt = require('bcryptjs')
const User = require('../../model/UserModel')
const Settings = require('../../model/SettingModel');

require('../../config/passportLocal')

router.get('/', (req, res) => {
  res.render('login/login', { title: 'Login', pathname: ['home', 'login'] })
})

router.get('/register', (req, res) => {
  res.render('login/register', { title: 'Register User', pathname: ['home', 'register'] })

})


router.post('/register', async(req, res) => {
  const errors = [];
  await ValidateRegister(req.body, errors)

  if (errors.length > 0) {

    res.render('login/register', { title: 'Register User', pathname: ['home', 'register'], errors: errors, fields: req.body })
  } else {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.body.password.trim(), salt)
    const newUser = {
      displayName: req.body.displayName.trim(),
      email: req.body.email.trim(),
      password: hashPassword
    }
    try {
      const user = new User(newUser)
      await user.save()
      const setting = new Settings({})
      await setting.save()
      await User.findByIdAndUpdate({ _id: user._id }, { settings: setting._id })
      res.redirect('/login');

    } catch (error) {
      console.log(error)
      res.status(500).render('error/500', { title: 'Error', pathname: ['error'] })
    }

  }

})

router.post('/local',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/dashboard');

  });

module.exports = router