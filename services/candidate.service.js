const Jobs = require('../models/jobs');
const Candidate = require('../models/candidate');


exports.getAllCandidateByService = async (filters,queries) => {
    const jobs = await Candidate.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields)
    .populate("applyFor.id")
    return jobs;
}

exports.getCandidateByIdService = async (id) => {
    const jobs = await Jobs.findOne({_id: id}).populate("hiringManager.id");
    return jobs;
}

exports.applyJob = async (data) => {
    const candidate = await Candidate.create(data);
    return candidate
}