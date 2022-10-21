const { applyJob, getCandidateByIdService, getAllCandidateByService } = require("../services/candidate.service")


exports.getJobsCandidate = async (req, res, next) => {

    

    try {
        let filters = { ...req.query }
        //solt,page,limit, --- exclude
        const excludeField = ['sort', 'page', 'limit']
        excludeField.forEach(field => delete filters[field])
    
        //gt,li,get,lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|Lte)\b/g, match => `$${match}`)
    
        filters = JSON.parse(filterString)
        console.log(JSON.parse(filterString))
    
    
        const queries = {}
        if (req.query.sort) {
          const sortBy = req.query.sort.split(',').join(' ')
          queries.sortBy = sortBy
        }
        //
        if (req.query.fields) {
          const fields = req.query.fields.split(',').join(' ')
          queries.fields = fields
        }

        const allCandidate = await getAllCandidateByService(filters, queries);
      

        res.status(200).json({
            status: "success",
            massage: "successfully get data for all jobs",
            data: allCandidate
          })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: " Data is not getting",
            error : error.message
          })
    }
}
exports.getJobById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const jobs = await getCandidateByIdService(id);
        if(!jobs) {
            return res.status(400).json({
                status: "fail",
                error: "Could not finds a Job with this id"
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
            message: " Data is not getting",
            error : error.message
          })
    }
}
exports.applyJob = async (req, res, next) => {
    const {id} = req.params;
    try {
        const jobs = await getCandidateByIdService(id);
        // if(jobs.lastApplicationDate < new Date()) {
        //     res.status(400).json({
        //         status:"fail",
        //         error: "Can’t apply after deadline",
        //     })
        // }
        const candidate = await applyJob(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Job applied successfully',
            data: candidate
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: "apply Data is not inserted",
            error : error.message
          })
    }
}

exports.fileUpload = async (req, res) => {
    try {
      res.status(200).json(req.files)
    } catch (error) {
        error.message
    }
  }
