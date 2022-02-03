const jwt = require('jsonwebtoken')
const { BCRYPTSALT } = require('./config')

// Auth Response (token and user info)
async function userAuthResponse(user) {
  user = user.toJSON()
  delete user.password

  return {
    token: jwt.sign({ id: user._id }, BCRYPTSALT),
    user: user
  }
}

module.exports = {
    userAuthResponse: userAuthResponse
}