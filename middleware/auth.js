ensureAuth = function(req, res, next) {
  if (req.user) {
    return next()
  } else {
    res.redirect(('/login'))
  }
}
ensureGuest = function(req, res, next) {
  if (!req.user) return next()
  res.redirect('/dashboard')
}
module.exports = {
  ensureAuth,
  ensureGuest
}