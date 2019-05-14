var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var validator = require("validator");
var mongoosastic = require("mongoosastic");

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
  host: "localhost",
  port: 9200
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
