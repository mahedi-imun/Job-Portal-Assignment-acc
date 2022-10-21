const Jobs = require('../models/jobs');

exports.createJobsService = async (data) => {
    const jobs = await Jobs.create(data);
    return jobs
}
exports.getJobsService = async () => {
    const jobs = await Jobs.find({}).populate("hiringManager.id");
    return jobs
}
exports.getJobsServiceById = async (jobId) => {
    const jobs = await Jobs.findOne({_id: jobId});
    return jobs
}
exports.updateJobsService = async (id, data) => {
    const jobs = await Jobs.updateOne({_id: id}, data, {
        runValidators: true
    });
    return jobs
}