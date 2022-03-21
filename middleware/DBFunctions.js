const User = require('../model/UserModel')

module.exports = {
  GetSelectedUserAndPopulateProfile: async function(req, res, cb) {
    const user = await User.findById(userID).populate('profile')
    return cb(user)
  }
}