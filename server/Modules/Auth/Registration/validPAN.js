const User = require("../../../Model/User")
const { userAuthResponse } = require('../../../Config/authResponse')

async function ValidPAN(req, res) {
    try {
        const { PAN, fatherName, DOB, userDataStep2 } = req.body
        const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (!userDataStep2) {
            res.status(401).send({
                success: false,
                message: 'Data Insufficent !!!',
            })
            return 0
        }

        const { _id, registrationSteps } = userDataStep2

        if (!regex.test((PAN).toUpperCase())) {
            res.status(401).send({
                success: false,
                message: 'PAN not valid !!!',
            })
            return 0
        }

        if(!DOB) {
            res.status(401).send({
                success: false,
                message: 'DOB is required !!!',
            })
            return 0
        }

        if (!fatherName) {
            res.status(401).send({
                success: false,
                message: 'Father Name is required',
            })
            return 0
        }


        if (registrationSteps !== 2) {
            res.status(401).send({
                success: false,
                message: 'Either you are register user or you are in wrong step !!!',
            })
            return 0
        }

        let isUserDataPresent = await User.findById(_id)

        if (isUserDataPresent) {

            if(isUserDataPresent['registrationSteps'] && isUserDataPresent['registrationSteps'] === 3) {
                res.status(200).send({
                    success: true,
                    message: 'You have already been registered, Please Login !!!',
                })
    
                return 0
            }

            let user = await User.findOneAndUpdate({ _id: _id }, { $set: { PAN: (PAN).toUpperCase(), fatherName: fatherName, DOB: DOB, registrationSteps: 3 } }, { returnDocument: 'after' })
            await User.updateOne({ _id: _id }, {$inc: {activeSession: 1}})

            res.status(200).send({
                success: false,
                message: 'Valid Information, Registration Step 3 verified !!!',
                data: await userAuthResponse(user)
            })

            return 0
        }
        else {
            res.status(401).send({
                success: false,
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
    ValidPAN: ValidPAN
}