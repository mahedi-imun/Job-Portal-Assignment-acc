const { createUserService, loginUserService, getUserServiceByEmail } = require("../services/user.service");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/jwtToken");
exports.signup = async (req, res) => {
    try {
        const user = await createUserService(req.body)
        res.status(200).json({
            status: "success",
            message: " successfully sign up"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "please prove email and password"
            });
        }
        const [user] = await getUserServiceByEmail(email);
        console.log(user)
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "no user found! please create a account"
            });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(403).json({
                status: "fail",
                error: "password is not valid"
            });
        }
        if (user.status != 'active') {
            return res.status(401).json({
                status: "fail",
                error: "your account not active yet please contact us"
            });
        }
        const token = generateToken(user)
        const { password: pwd, ...others } = user.toObject()

        res.status(200).json({
            success: true,
            message: "successfully log in",
            data: {
                user: others,
                token
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};
exports.getMe = async (req, res) => {
    try {
        const user = await getUserServiceByEmail(req.user?.email)
        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};