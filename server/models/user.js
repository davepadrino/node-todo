const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;
const validRole = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} not a valid role",
};
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: validRole,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = mongoose.model("User", userSchema);
