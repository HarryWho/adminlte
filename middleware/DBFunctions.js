const Profile = require('../model/ProfileModel')
const User = require('../model/UserModel')
module.exports = {
  FollowLink: function(author, uprofile, done) {

    // let me = {}
    // User.findById(uprofile._id, (err, selfUser) => {}).clone().then((selfUser, err) => {
    //   me = Profile.findById(selfUser.profile._id, (err, self) => {}).clone().then((self) => {})
    // });
    link = `<li><a href="/follow/${author.profile._id}">Follow</a></li>`;
    if (author.profile._id.toString() !== uprofile.profile._id.toString()) {
      uprofile.profile.followees.forEach(user => {

        if (user === author._id.toString()) {
          link = `<li><a href="/follow/unfollow/${author.profile._id}">Unfollow</a></li>`;
        }
      })
    } else {
      link = ''
    }

    return done(link)

  }
}