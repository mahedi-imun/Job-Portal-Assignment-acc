const { createUserService, getUserByEmail } = require("../services/user.service")
const { generateToken } = require("../utils/token")

exports.signUp = async (req, res, next) => {
    try {
        const sign = await createUserService(req.body)
        
        res.status(200).json({
            status: "success",
            massage: "successfully create a new user",
            data: sign
          })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data is not inserted",
            error: error.message
          })
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({
                stauts: "fail",
                error: "please provide your credaentials",
              })
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
              stauts: "fail",
              error: "user not found.Please create account",
            })
          }

          const isPasswordValid = user.comparePassword(password, user.password);
          if(!isPasswordValid) {
            return res.status(403).json({
                stauts: "fail",
                error: "password is not correct",
              })
          }
          if(user.status != 'active') {
            return res.status(401).json({
                stauts: "fail",
                error: "Your Account is not active",
              })
          }

          const token = generateToken(user);

          const {password: pws, ...others} = user.toObject();
          res.status(200).json({
            stauts: "success",
            massage: "successfully login in",
            data: {
              user: others,
              token
            }
          })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Data is not inserted",
            error: error.message
          })
    }
}

exports.getMe = async (req, res) => {
    try {
      const user= await getUserByEmail(req.user?.email)
      res.status(200).json({
        status:"Success",
        data:user
      })
  
    } catch (error) {
      res.status(400).json({
        stauts: "fail",
        error,
      })
    }
  }