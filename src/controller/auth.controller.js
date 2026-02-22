const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {


    try {

        const { username, email, password, role = "user" } = req.body;

        const userAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (userAlreadyExist) {
            return res.status(409).send({
                success: false,
                message: "User Already Exist"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({

            username,
            email,
            password: hashpassword,
            role
        })

        const token = jwt.sign({
            _id: user.id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).send({
            message: "User Registed Successfully",
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })


    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in register api"
        })

    }
}

const loginUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })


        if (!user) {
            return res.status(401).send({
                message: "Invalid Credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            _id: user.id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).send({
            message: "User login Successfully",
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (err) {
        res.status(500).send(
            { message: "Server Error" }
        )

    }


}

const logoutUser = async (req, res) => {
    res.clearCookie("token"); 
    res.status(200).send({
        message: "User Logout successfully"
    })
}
module.exports = { registerUser, loginUser ,logoutUser}