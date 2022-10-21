const { HiringManager, HiringManagerService, getHiringManagerService } = require("../services/hiringManager.service")


exports.createHiringManager = async (req, res, next) => {

    try {
        const jobs = await HiringManagerService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'manager created successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "manager is not inserted",
            error : error.message
          })
    }
}
exports.getHiringManager = async (req, res, next) => {

    try {
        const jobs = await getHiringManagerService()
        res.status(200).json({
            status: 'success',
            message: 'manager created successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "manager is not inserted",
            error : error.message
          })
    }
}
