const mongoose = require("mongoose");
const action = require("../static/enums");

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }).then(
  () => {
    console.log(action.CONNECTED);
  },
  err => {
    console.log(err);
  }
);
