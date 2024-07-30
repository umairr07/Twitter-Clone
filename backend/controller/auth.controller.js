const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//signup
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await userModel.findOne({ username });
        console.log(userExist)

        if (!userExist) {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            await userModel.create({
                ...req.body,
                password: hashedPassword
            })
        }

        res.json({
            success: true,
            message: "User created successfully",
        })

    } catch (error) {
        res.json({
            success: false,
            message: "User already exists",
        })
    }
}

//login
const logIn = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
        res.json({
            success: false,
            message: "Email doesnt exists"
        })
    }

    console.log("db stored password", user.password)
    console.log("user entered pass", req.body.password)

    //comparing the hashed password with user password
    const isPasswordSame = await bcrypt.compare(req.body.password, user.password)
    // console.log(isPasswordSame)

    if (!isPasswordSame) {
        res.json({
            success: false,
            message: "Password doesn't match"
        })
    }

    const currentTime = Math.floor(new Date().getTime() / 1000) //miliseconds
    const expiryTime = currentTime + 7200; // 1 hour
    console.log(expiryTime)

    const jwtPayload = {
        userId: user._id,
        exp: expiryTime
    }

    const token = jwt.sign(jwtPayload, "secret-key")
    console.log(token)
    await userModel.findOneAndUpdate(user._id, { $set: { token } })


    res.json({
        success: true,
        message: "Login successful"
    })
}

const logOut = async (req, res) => {
    res.json({
        message: "Logout api call"
    })
}

const authController = {
    signUp,
    logIn,
    logOut
}

module.exports = authController;