const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    /**
   * 1. If the token in present in request
   * 2. Check if the token is valid (Validate the generating source)
   * 3. If the token is expired
   * 4. User details validation
   */
    try {
        const beareToken = req.headers.authorization
        if (!beareToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = beareToken.split(" ")[1];
        jwt.verify(token, "secret-key"); //token validation

        const tokenData = jwt.decode(token)

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

        if (currentTimeInSeconds > tokenData.exp) {
            // Token is expired
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await userModel.findById(tokenData.userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}

module.exports = authMiddleware;