const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Plese provide a valid Email"],
        unique: true,
        require: [true, "Email Address Require"],
    },
    password: {
        type: String,
        require: [true, "password is Require"],
        validate: (value) => {
            validator.isStrongPassword(value, {
                minLength: 6,
                minLowercase: 3,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            message: "password {VALUE} is Strong Enaup"
        }
    },
    confirmPassword: {
        type: String,
        require: [true, "Provide confirm password is Require"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "password does not match"
        }
    },
    role: {
        type: String,
        enum: ["Candidate", "Hiring-Manager", "Admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        require: [true, "Provide First Name"],
        trim: true,
        minLength: [3, "Name must be 3 charcters "],
        maxLength: [100, "Name is too large"]
    },
    lastName: {
        type: String,
        require: [true, "Provide Last Name"],
        trim: true,
        minLength: [3, "Name must be 3 charcters "],
        maxLength: [100, "Name is too large"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },
    shippingAddress: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiries: Date,

},{
    timestamps: true
})

userSchema.pre("save", function (next){
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}

const User=mongoose.model('User', userSchema);

module.exports=User; 