const { createJobsService, getJobsService, getJobsServiceById, updateJobsService } = require("../services/jobs.service")

exports.createJob = async (req, res, next) => {

    try {
        const jobs = await createJobsService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Job created successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not inserted",
            error : error.message
          })
    }
}
exports.getJob = async (req, res, next) => {

    try {
        const jobs = await getJobsService()
        res.status(200).json({
            status: 'success',
            message: 'Job getting successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not getting",
            error : error.message
          })
    }
}
exports.getJobById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const jobs = await getJobsServiceById(id)
        if(!jobs) {
            res.status(400).json({
                status:"fail",
                message: "Could not finds a Job with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Job getting successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not getting",
            error : error.message
          })
    }
}

exports.updateJob = async (req, res, next) => {
    const {id} = req.params;
    try {
        const jobs = await updateJobsService(id, req.body)
        if(!jobs.modifiedCount) {
            res.status(400).json({
                status:"fail",
                message: "Could not finds a Job with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Job updating successfully',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not updated",
            error : error.message
          })
    }
}