// Imports
const jwt = require('jsonwebtoken')
const User = require('../Model/User')
const { BCRYPTSALT } = require('./config')

// Authentication middleware
async function authentication (request, response, next) {
  try {
    let header = request.headers.authentication    

  if (header) {
    try {
      const token = header.split(' ')
      const userToken = jwt.verify(token[1], BCRYPTSALT)
      let user = await User.findOne({ _id: userToken.id })

      if (user) {
        return {
          isAuthenticated: true,
          user: user
        }
      }
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    return {
      isAuthenticated: false,
      user: null
    }
  }

  next()
  }
  catch(error) {
    console.log(error)
  }
}

module.exports = {
    authentication: authentication
}
