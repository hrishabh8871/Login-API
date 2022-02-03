const { ValidMobileStep1, ValidEmailStep2, ValidPAN } = require('./Registration/index')
const { UserLogin } = require('./userLogin')

module.exports = {
    ValidMobileStep1,
    ValidEmailStep2,
    ValidPAN: ValidPAN,
    UserLogin: UserLogin
}
