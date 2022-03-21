const User = require('../model/UserModel')
module.exports = {
  ValidateRegister: async function(body, errors) {
    //console.log(req.body)
    console.log(body)
    if (body.displayName == '' || body.email == '' || body.password == '' || body.password2 == '') {
      errors.push({ msg: "All fields are required" })
    }
    if (!isEmailValid(body.email)) {
      errors.push({ msg: "Not a valid email" })
    }
    const user = await User.find({ email: body.email })
    console.log(user.length)
    if (user.length > 0) {
      errors.push({ msg: "email already registered" })
    }
    if (body.password.length < 6) {
      errors.push({ msg: "password must be at least 6 characters long" })
    }
    if (body.password != body.password2) {
      errors.push({ msg: "Passwords do not match" })
    }
    return errors
  }
}

function isEmailValid(email) {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  )

  return emailRegexp.test(email)
}