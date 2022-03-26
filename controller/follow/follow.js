const express = require('express');
const router = express.Router();
const User = require('../../model/UserModel')
const Profile = require('../../model/ProfileModel')
const Notification = require('../../model/NotificationModel')
const Follower = require('../../model/FollowerModel')
const Following = require('../../model/FollowingModel')

router.get('/:userID', async(req, res) => {
  try {
    const idToFollow = await User.findOne({ profile: req.params.userID })
      // const myfollowing = await new Following({ user: idToFollow }).save();
      // const myfollowers = await new Follower({ user: req.user._id }).save();
    const followee = await Profile.findByIdAndUpdate(req.user.profile._id, { $push: { followees: idToFollow._id } });
    const follower = await Profile.findByIdAndUpdate(idToFollow.profile._id, { $push: { followers: req.user._id } });
    const notify = new Notification({
      notificationFor: req.params.userID,
      notificationFrom: req.user._id,
      notificationMsg: `${req.user.displayName} is now following you`
    });
    await notify.save()
    await User.findByIdAndUpdate(idToFollow._id, { $push: { notifications: notify._id } });

    req.user.profile.followees.push(idToFollow._id)
    req.session.save(function(err) {
      req.session.reload(function(err) {

      });
    });
    res.redirect('/blog')

  } catch (error) {
    console.log(error)
    res.render('error/500', { title: 'Error', user: req.user, pathname: ['home', '500 error'] })

  }

})

router.get('/unfollow/:userID', async(req, res) => {
  const idToFollow = await User.findOne({ profile: req.params.userID })
  await Profile.findByIdAndUpdate(req.user.profile._id, { $pull: { followees: idToFollow._id } });
  await Profile.findByIdAndUpdate(idToFollow.profile._id, { $pull: { followers: req.user._id } });

  req.user.profile.followees.splice(idToFollow._id.toString(), 1)
  req.session.save(function(err) { req.session.reload(function(err) {}) });
  res.redirect('/blog')
})

module.exports = router;