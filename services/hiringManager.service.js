const HiringManager = require('../models/HiringManager');

exports.HiringManagerService = async (data) => {
    const manager = await HiringManager.create(data)
    return manager
}
exports.getHiringManagerService = async () => {
    const manager = await HiringManager.find({})
    return manager
}