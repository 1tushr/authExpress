const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us ur name"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "enter a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please provide the password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm the password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: "Password are not same !",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next(); 
});

const User = mongoose.model("User", userSchema);
module.exports = User;
