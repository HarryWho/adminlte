const express = require('express')
const router = express.Router()
const Blog = require('../../model/BlogModel')
const Like = require('../../model/LikeModel')
const Comment = require('../../model/CommentModel')
const { commentElement } = require('../../middleware/comment')
router.get('/', async(req, res) => {
  try {
    const blogs = await Blog.find({ status: 'public' }).populate([{
      path: 'author',
      select: ['displayName', 'image', 'profile']
    }, {
      path: 'comments',
      options: { sort: { 'date': -1 } },
      populate: {
        path: 'author',
        select: ['displayName', 'image'],
      }
    }, {
      path: 'likes',
      populate: {
        path: 'likedBy',
        select: ['displayName']
      }

    }]).sort({ date: 'desc' });
    res.render('logedin/blog/blog_template', {
      pathname: ['home', 'blog'],
      user: req.user,
      title: 'Site Blogs',
      blogs: blogs
    });
  } catch (error) {
    console.log(error)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })
  }
})

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
router.delete('/like/:blogID', async(req, res) => {
  const like = await Blog.findById(req.params.blogID).populate('likes')
  let likes = like.likes.find(like => like.likedBy == req.body.id)

  await Like.findByIdAndRemove(likes._id)
  await Blog.findByIdAndUpdate(like._id, { $pull: { 'likes': likes._id } })
  res.send(like)
})
router.post('/comment/:blogID', async(req, res) => {

  try {
    const newComment = {
      author: req.body.author,
      comment: req.body.comment
    }
    const comment = await new Comment(newComment).save()

    await Blog.findByIdAndUpdate(req.params.blogID, { $push: { comments: comment._id } })
      //const element = await commentElement(req.body.img, req.body.comment, req.body.authorName)

    res.send('Comment Saved');
  } catch (error) {
    console.log(error)
    res.send('Error: ' + error.message);
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', 'error'] })

  }
})
module.exports = router