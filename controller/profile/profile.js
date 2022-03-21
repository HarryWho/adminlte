const express = require('express')
const router = express.Router();
const User = require('../../model/UserModel')
const Profile = require('../../model/ProfileModel')
const { GetSelectedUserAndPopulateProfile } = require('../../middleware/DBFunctions')
router.get('/new', (req, res) => {
  res.render('logedin/profile_form', {
    title: 'Update User profile',
    user: req.user,
    pathname: ['home', 'update profile'],
    action: '/profile'
  })
})

router.get('/:userID', async(req, res) => {
  const userprofile = await User.findById(req.params.userID).populate('profile')
  res.render('logedin/profile', {
    title: 'User Profile',
    user: req.user,
    pathname: ['home', 'profile'],
    profile: userprofile
  })
})

router.get('/edit/:userID', async(req, res) => {
  const profile = await Profile.findById({ _id: req.user.profile })

  res.render('logedin/profile_form', {
    pathname: ['home', 'edit profile'],
    user: req.user,
    profile: profile,
    title: 'Edit Profile',
    action: `/profile/${req.user.profile}?_method=PUT`
  })
})

router.put('/:profileID', async(req, res) => {
  const newProfile = {
    occupation: req.body.occupation,
    school: req.body.school,
    uni: req.body.uni,
    certificates: req.body.certificates.split(','),
    location: req.body.location,
    skills: req.body.skills.split(','),
    cover: req.body.cover
  }
  await Profile.findByIdAndUpdate(req.user.profile, newProfile)
  res.redirect(`/profile/${req.user._id}`)
})

router.post('/', async(req, res) => {
  const newProfile = {
    occupation: req.body.occupation,
    school: req.body.school,
    uni: req.body.uni,
    certificates: req.body.certificates.split(','),
    location: req.body.location,
    skills: req.body.skills.split(','),
    cover: req.body.cover
  }
  try {
    const profile = new Profile(newProfile)
    await profile.save()
    await User.findByIdAndUpdate({ _id: req.user._id }, { profile: profile._id })
    req.user.profile._id = profile._id;
    req.session.save(function(err) {
      req.session.reload(function(err) {

      });
    });
    res.redirect(`/profile/${req.user._id}`)
  } catch (error) {
    console.log(error)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', '500 error'] })
  }
})



module.exports = router;