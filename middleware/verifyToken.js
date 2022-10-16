const jwt = require("jsonwebtoken")
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1]
        if (!token) {
            res.status(401).json({
                status: false,
                message: "unauthorize"
            })
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, decoded) {
                if (error) {
                    return res.status(403).send({ message: 'forbidden' })
                }
                req.user = decoded
                next()
            })
        }
    } catch (error) {
        console.log(error);
    }
}