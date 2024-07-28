//signup
const signUp = async (req, res) => {
    res.json({
        message: "Signup api call"
    })
}

//login
const logIn = async (req, res) => {
    res.json({
        message: "Login api call"
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