module.exports = {
  commentElement: function(img, comment, author) {
    const boxComment = document.createElement('div')
    const boxImage = document.createElement('img')
    const commentText = document.createElement('div')
    const spanUsername = document.createElement('span')
    const spanDate = document.createElement('span')

    boxComment.appendChild(boxImage)
    spanUsername.appendChild(spanDate)
    commentText.appendChild(spanUsername)
    boxComment.appendChild(commentText)
    console.log(boxComment)
    return boxComment

  }
}