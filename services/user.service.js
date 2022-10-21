const User = require('../models/User');

exports.createUserService = async (userInfo) => {
    const signUp = await User.create(userInfo);
    return signUp
}
exports.getUserByEmail = async (email) => {
    const login = await User.findOne({email});
    return login
}