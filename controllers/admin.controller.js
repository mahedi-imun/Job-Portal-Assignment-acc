const { getCandidateService, getCandidateIdService, getManagerService } = require("../services/admin.service")


exports.getCandidate = async (req, res, next) => {

    try {
        const candidate = await getCandidateService()
        res.status(200).json({
            status: 'success',
            massage: "successfully get data for all Candidate",
            data: candidate
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not getting",
            error : error.message
          })
    }
}
exports.getCandidateId = async (req, res, next) => {
    const {id} = req.params;
    try {
        const candidate = await getCandidateIdService(id)
        if(!candidate){
            return res.status(400).json({
                stauts:"fail",
                error : "Could not finds a candidate with this id"
              })
          }
        res.status(200).json({
            status: 'success',
            massage: "successfully get data for all Candidate",
            data: candidate
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "Data is not getting",
            error : error.message
          })
    }
}

exports.getManager = async (req, res, next) => {
    try {
      const manager=await getManagerService();
      res.status(200).json({
        status: "success",
        massage: "successfully get data for all Manager",
        data: manager
      })
    } catch (error) {
      res.status(400).json({
        status:"fail",
        message: "Data is not found",
        error : error.message
      })
    }
  }