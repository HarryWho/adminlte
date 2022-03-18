require('dotenv').config({ path: './config/config.env' });
const { ConnectDB } = require('./config/DB')
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const app = express()

// set static public folder
app.use(express.static('public'))

// body parser
app.use(express.urlencoded({ extended: false }))

// express-sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI

  })
}))

app.use(passport.initialize());
app.use(passport.session());

// setupfor the view engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/starter')
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.use(expressLayout)


// Routes
app.use('/', require('./controller/home/index'))
app.use('/login', require('./controller/login/index'))
app.use('/dashboard', require('./controller/logedin/index'))

// connect to MongoDB
ConnectDB();
// start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})