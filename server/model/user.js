const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const mongoosastic = require("mongoosastic");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  name: String,
  password: String
});

UserSchema.plugin(mongoosastic, {
  host: process.env.ELASTIC_HOST,
  port: process.env.ELASTIC_PORT
});

UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = User = mongoose.model("user-demo", UserSchema);
