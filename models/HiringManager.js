const mongoose = require('mongoose');
const validator = require('validator');

const hiringManager = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for thid hiring Manager"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name mast be 3 characters"],
        maxLength: [100, "Name is too larges"],
    },
    designation:{
        type:String,
        require:true
    },
    email:{
        type:String,
        lowercase:true,
        validator:[validator.isEmail,"Plese provide a valid Email"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },
});

const HiringManager  = mongoose.model("HiringManager", hiringManager);

module.exports = HiringManager;