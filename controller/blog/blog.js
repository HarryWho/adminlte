const express = require('express')
const router = express.Router()
const Blog = require('../../model/BlogModel')
const Like = require('../../model/LikeModel')

router.get('/new', (req, res) => {
  res.render('logedin/blog/blog_form', {
    title: 'New Blog',
    pathname: ['home', 'new blog'],
    user: req.user,
    action: '/blog',
    caption: 'Create Blog'
  })
})
router.get('/edit/:blogID', async(req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogID)
    res.render('logedin/blog/blog_form', {
      title: 'Edit Blog',
      user: req.user,
      pathname: ['home', 'edit blog'],
      action: `/blog/${blog._id}?_method=PUT`,
      caption: "Update Blog",
      blog: blog
    })
  } catch (error) {
    console.log(error.message)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })
  }
})
router.post('/', async(req, res) => {
  const newBlog = {
    author: req.user._id,
    blog: req.body.blog,
    title: req.body.title,
    status: req.body.status
  };
  try {

    const result = new Blog(newBlog);
    await result.save()
      // const result = await Blog.find()

    res.redirect('/dashboard')

  } catch (error) {
    console.log(error.message)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })
  }
});
router.put('/:blogID', async(req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.blogID, req.body)
    res.redirect('/dashboard')

  } catch (error) {
    console.log(error)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })
  }
})
router.delete('/:blogID', async(req, res) => {
  await Blog.findByIdAndRemove(req.params.blogID)
  res.redirect('/dashboard')
})

router.put('/like/:blogID', async(req, res) => {
  try {

    const likes = await new Like({ likedBy: req.body.id }).save()
    const like = await Blog.findByIdAndUpdate(req.params.blogID, { $push: { likes } });
    res.send(like)

  } catch (error) {
    console.log(error)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })

  }
})
router.delete('/delete/like/:blogID', (req, res) => {

})
module.exports = router