var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/UserModel')
const passport = require('passport');
const res = require('express/lib/response');
const Settings = require('../model/SettingModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    User.findOne({ googleId: profile.id }, async function(err, user) {
      if (!user) {

        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        }
        try {
          let user = new User(newUser);
          await user.save()
          const setting = new Settings()
          await setting.save()
          await User.findByIdAndUpdate({ _id: user._id }, { settings: setting._id })
          user.settings = setting;
          if (err) return cb(err, false)

          return cb(null, user);
        } catch (error) {
          console.log(error)
          return cb(error, false)
        }
      }
      if (err) return cb(err, false)
      return cb(null, user);



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