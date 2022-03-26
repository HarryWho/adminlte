const moment = require('moment');
const { exists } = require('../model/BlogModel');

module.exports = {
  dateFormat: function(date, format) {
    return moment(date).format(format);
  },
  hasLiked: (likes, userName, cb) => {
    let isLiked = false;
    let tooltips = ''
    likes.forEach(like => {
      tooltips += like.likedBy.displayName + '\n';
      if (like.likedBy.displayName === userName) {
        isLiked = true

      }
    });

    cb(isLiked, tooltips);
  },
  truncate: function(str, len) {
    if (str.length <= len) return str
    let subStr = str.substring(0, len);
    subStr = subStr.substring(0, subStr.lastIndexOf(' '))
    return subStr + '... '
  }


}