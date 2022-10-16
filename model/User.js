const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator")
const bcrypt = require('bcryptjs');
const {ObjectID} =mongoose.Schema.Types
const userSchema = new Schema({
    email: {
        type: String,
        require: [true, "please provide a email "],
        trim:true,
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        validate:{
            validator:(value)=>{
                validator.isStrongPassword(value,{
                    minLength:6,
                    minLowercase:3,
                    minNumbers:1,
                    minUppercase:1,
                    minSymbols:1
                });
                message:'password {Value} is not strong enough'
            }
        }
    },
    confirmPassword:{
        type:String,
        required:[true,'please provide confirm password'],
        validate:{
            validator:function (value){
                return value === this.password
            },
            message:"password don't match "
        }
    },
    role:{
        type:String,
        enum:['candidate','admin','hiring-manager'],
        default:"{Value}",
    },
    firstName: {
        type: String,
        require: [true, 'please provide a first name'],
        trim: true,
        minLength: [3, 'Name must be 3 character'],
        maxLength: [100, 'Name is too long'],
        lowercase:true
    },
    lastName: {
        type: String,
        require: [true, 'please provide a last name'],
        trim: true,
        minLength: [3, 'Name must be 3 character'],
        maxLength: [100, 'Name is too long'],
        lowercase:true
    },
    contactNumber:[{
        type:String,
        require:[true,'please provide a valid number'],
        validate:{
            validator:(value)=>{
                return validator.isMobilePhone(value)
            },
            message:"please provide a valid phone"
        }
    }],
    address:String,
    imageURL:{
        require:false,
        type:String,
        validate: [validator.isURL, "please provide a valid url"]
    },
    status:{
        type:String,
        enum:['active','inactive','blocked'],
        default:"active",
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
}, { timestamps: true },);
userSchema.pre('save',function(next){
    const password = this.password;
    const hash = bcrypt.hashSync(password);
    this.confirmPassword=undefined;
    this.password = hash;
    next();
});

userSchema.methods.comparePassword=(password,hashPassword)=>{
    const isValidPassword = bcrypt.compareSync(password,hashPassword);
    return isValidPassword;
}
module.exports = mongoose.model('User', userSchema);