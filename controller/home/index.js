const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/auth')
const Blog = require('../../model/BlogModel')
const Comment = require('../../model/CommentModel')

router.get('/', ensureGuest, (req, res) => {
  res.render('home/home', { title: 'Home', pathname: ['home'] })
})

router.get('/dashboard', ensureAuth, async(req, res) => {
  const blogs = await Blog.find({ author: req.user._id })
    .populate([{
      path: 'author',
      select: ['displayName', 'image']
    }, {
      path: 'likes',
      populate: {
        path: 'likedBy',
        model: 'User'
      }
    }]).sort({ date: 'desc' })
    // console.log(blogs[0].likes[0].likedBy.displayName)
  res.render('logedin/dashboard', { title: 'Dashboard', user: req.user, pathname: ['home', 'dashboard'], blogs: blogs })
})
router.get('/logout', ensureAuth, (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router