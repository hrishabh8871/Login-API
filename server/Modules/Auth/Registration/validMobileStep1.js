const User = require("../../../Model/User")

async function ValidMobileStep1(req, res) {
    try {
        const { mobile, name } = req.body

        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!(Boolean(regex.test(mobile)))) {
            res.status(401).send({
                success: false,
                message: 'Mobile Number Must Be 10 Digits !!!',
            })
            return 0
        }

        //For Info level
        logger.info(mobile)

        if (!name) {
            res.status(401).send({
                success: false,
                message: 'Name is required',
            })
            return 0
        }

        let isUserDataPresent = await User.findOne({ mobile: mobile })

        if (isUserDataPresent) {
            res.status(401).send({
                success: true,
                message: 'User has already been compeleted step I of registration, Please Login !!!',
                data: isUserDataPresent
            })

            return 0
        }
        else {
            let user = await User.create({
                mobile: mobile,
                name: name,
            })

            res.status(200).send({
                success: true,
                message: 'Valid mobile number, Registration Step 1 verified !!!',
                data: user
            })

            return 0
        }

    }
    catch (error) {
        logger.error(error.message)
        res.status(500).send({
            success: false,
            message: 'Something Went Wrong!!!'
        })
    }
}

module.exports = {
    ValidMobileStep1: ValidMobileStep1
}
