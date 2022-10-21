const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const candidateSchema  = mongoose.Schema({
    candidateName: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Plese provide a valid Email"],
        unique: true,
        require: [true, "Email Address Require"],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },
    address:{
        type: String,
        require:true
    },
    highestEducation:{
        type: String,
        require:true
    },
    applyFor:{
        name:String,
        id:{
            type: ObjectId,
            ref: "Jobs",
            require: true,
        }
    },
    uploadResume:{
        type:String,
    }
});

const candidate = mongoose.model("Candidate", candidateSchema);

module.exports = candidate;