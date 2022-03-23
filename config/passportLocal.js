const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {

    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, isMatch) => {

        if (!isMatch) return done(err, false)
        return done(null, user);
      });

    }).populate('settings');
  }
));



passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});