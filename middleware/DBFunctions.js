const Profile = require('../model/ProfileModel')
const User = require('../model/UserModel')
module.exports = {
  FollowLink: function(author, webUser, done) {

    let link = ''
      //   // return new Promise((resolve, reject) => {
    selfUser(webUser)
      .then(() => {

      })


    link = `<li><a href="/follow/${author.profile._id}">Follow</a></li>`;
    if (author._id.toString() != webUser._id.toString()) {

      webUser.profile.followees.forEach(user => {

        if (user.toString() == author._id.toString()) {
          link = `<li><a href="/follow/unfollow/${author.profile._id}">Unfollow</a></li>`;
        }
      })
    } else {
      link = ''
    }

    return done(link)

    // let me = {}
    // User.findById(uprofile._id, (err, selfUser) => {}).clone().then((selfUser, err) => {
    //   me = Profile.findById(selfUser.profile._id, (err, self) => {}).clone().then((self) => {})
    // });


  },
  FollowButton: function(author, webUser, done) {
    let button = `<a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>`
    webUser.profile.followees.forEach(user => {
      if (user == author._id.toString()) {
        button = `<a href="#" class="btn btn-primary btn-block"><b>Unfollow</b></a>`
      }
    })
    done(button)
  },


  UsersNotifications: function(webUserId) {
    return new Promise((resolve, reject) => {
      selfUserNotifications(webUserId).then(webUser => {
        resolve(webUser.notifications)

      })
    })
  }
}
const selfUser = (webUser) => {
  return new Promise((resolve, reject) => {
    User.findById(webUser._id, (err, user) => {
      resolve(user)
    })
  })
}

const selfUserNotifications = (webUser) => {
  return new Promise((resolve, reject) => {
    User.findById(webUser, (err, user) => {
      resolve(user)
    }).populate('notifications')
  })

}
const webAuthor = (user) => {
  return new Promise((resolve, reject) => {
    resolve(Profile.findById(user))
  })
}