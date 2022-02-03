const User = require("../../Model/User")
const bcrypt = require('bcryptjs')
const { userAuthResponse } = require('../../Config/authResponse')

async function UserLogin(req, res) {
    try {
        const { mobile, password } = req.body
        await User.findOne({ mobile: mobile })
            .then(async (userValidate) => {
                if (userValidate) {
                    if (password) {
                        const passwordsMatch = await bcrypt.compare(password, userValidate.password)
                        if (passwordsMatch) {
                            if(userValidate['activeSession'] === 3) {
                                res.status(401).send({
                                    success: false,
                                    message: 'You have exceed no of login, Please logout from you another device !!!'
                                })
                                return 0
                            }

                            await User.updateOne({ _id: userValidate['_id'] }, {$inc: {activeSession: 1}})

                            res.status(200).send({
                                success: true,
                                message: 'User Data',
                                data: await userAuthResponse(userValidate)
                            })
                        }
                        else {
                            res.status(401).send({
                                success: false,
                                message: 'Password does not match !!!'
                            })
                        }
                    }
                    else {
                        res.status(401).send({
                            success: false,
                            message: 'Please Enter Password !!!'
                        })
                    }
                }
                else {
                    res.status(401).send({
                        success: false,
                        message: 'User Not Found !!!'
                    })
                }
            }).catch(error => res.status(400).send({
                success: false,
                message: error.message
            }));
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!!'
        })
    }
}

module.exports = {
     UserLogin: UserLogin
}