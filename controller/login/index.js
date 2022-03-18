const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login/login', { title: 'Login', pathname: ['home', 'login'] })
})

router.get('/register', (req, res) => {
  res.render('login/register', { title: 'Register User', pathname: ['home', 'register'] })

})
module.exports = router