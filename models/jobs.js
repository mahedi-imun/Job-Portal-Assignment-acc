const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    jobTitle:{
        type:String,
        trim:true,
        require:true,
    },
    jobType:{
        type:String,
        require:true,
        enum:{
            values:["Remote","On-Site","Hybrid"],
            message:"{VALUE} is not valid name"
        }
    },
    jobDescription:String,
    jobLocation:{
        type:String,
        require:true,
    },
    company:{
        type:String,
        require:true,
    },
    salary:{
        type:Number
    },
    jobPostingDate:{
        type: Date,
        default: Date.now  
    },
    // lastApplicationDate:{
    //     type: Date, 
    //     require:true,
    // },
    vacancy:{
        type:String,
        require:true,
    },
    hiringManager:{
        name:String,
        id:{
            type: ObjectId,
            ref: "HiringManager",
            require: true,
        }
    },
});

const jobs = mongoose.model("Jobs", jobSchema);

module.exports = jobs;