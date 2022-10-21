const Candidate = require("../models/candidate");
const HiringManager = require("../models/HiringManager");

exports.getCandidateService = async () => {
    const candidate = await Candidate.find({})
    return candidate
}
exports.getCandidateIdService = async (candidateId) => {
    const candidate = await Candidate.findOne({_id: candidateId}).populate("applyFor.id")
    return candidate
}
exports.getManagerService = async () => {
    const candidate = await HiringManager.find({})
    return candidate
}
