require('dotenv').config({ path: './config/config.env' });
const { ConnectDB } = require('./config/DB')
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
  //{ 'transports': ['xhr-polling'] }, 
  // setupfor the view engine
app.set('view engine', 'ejs')
app.use(expressLayout)
app.set('layout', 'layouts/starter')
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

// set static public folder
app.use(express.static('public'))

// body parser
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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

const { dateFormat, hasLiked, truncate } = require('./middleware/formats')
const { FollowLink, FollowButton, UsersNotifications } = require('./middleware/DBFunctions')
  // various formats
app.use((req, res, next) => {
  res.locals.dateFormat = dateFormat
  res.locals.hasLiked = hasLiked
  res.locals.truncate = truncate
  res.locals.FollowLink = FollowLink
  res.locals.FollowButton = FollowButton
  res.locals.UsersNotifications = UsersNotifications,


    io.once('connect', (socket) => {
      let sockExists = false
      try {
        io.sockets.sockets.forEach(sock => {
          if (sock.name == req.user.displayName) {
            sockExists = true;

          }
        })
        if (!sockExists) {
          socket.name = req.user.displayName;
        }

      } catch {}


      socket.on('userList', () => {

        let message = ''
        io.sockets.sockets.forEach(sock => {
          if (sock.name != 'udefined') {
            message += `<li><a href="#"><i class="fa fa-circle text-success"></i> <span>${sock.name}</span></a></li>`
          }
        })
        io.emit('userList', message);
      })
    })
  next()
})

const { ensureAuth, ensureGuest } = require('./middleware/auth')


// Routes
app.use('/', require('./controller/home/index'))
app.use('/login', ensureGuest, require('./controller/login/index'))
app.use('/auth', ensureGuest, require('./controller/login/auth'))
app.use('/settings', ensureAuth, require('./controller/home/save'))
app.use('/profile', ensureAuth, require('./controller/profile/profile'))
app.use('/blog', ensureAuth, require('./controller/blog/blog'))
app.use('/follow', ensureAuth, require('./controller/follow/follow'))
app.use('/expense', ensureAuth, require('./controller/expensetracker/expensetracker'))

// connect to MongoDB
ConnectDB();
// start Server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})