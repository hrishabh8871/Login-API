const User = require("../../../Model/User")
const bcrypt = require('bcryptjs')
const { BCRYPTSALT } = require('../../../Config/config')

async function ValidEmailStep2(req, res) {
    try {
        const { email, password, userDataStep1 } = req.body

        if (!userDataStep1) {
            res.status(401).send({
                success: false,
                message: 'Data Insufficent !!!',
            })
            return 0
        }

        const { _id, registrationSteps } = userDataStep1

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(re.test(String(email).toLowerCase()))) {
            res.status(401).send({
                success: false,
                message: 'Email ID Invalid !!!',
            })
            return 0
        }

        if (!password && password.length < 6) {
            res.status(401).send({
                success: false,
                message: 'Minimum length of password should be 6 !!!',
            })
            return 0
        }

        if (registrationSteps !== 1) {
            res.status(401).send({
                success: false,
                message: 'Either you are register user or you are in wrong step !!!',
            })
            return 0
        }

        let isUserDataPresent = await User.findById(_id)

        if (isUserDataPresent) {

            let passwordHashed = ''
            passwordHashed = await bcrypt.hash(password, BCRYPTSALT)

            let user = await User.findOneAndUpdate({ _id: _id }, { $set: { email: email, password: passwordHashed, registrationSteps: 2 } }, { returnDocument: 'after' })
            user = user.toJSON()
            delete user.password

            res.status(200).send({
                success: true,
                message: 'Valid Email, Registration Step 2 verified !!!',
                data: user
            })

            return 0
        }
        else {
            res.status(401).send({
                success: true,
                message: 'User Invalid',
            })

            return 0
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something Went Wrong!!!'
        })
    }
}

module.exports = {
    ValidEmailStep2: ValidEmailStep2
}