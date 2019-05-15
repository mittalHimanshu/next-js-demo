const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: process.env.DIS_KEY
};

// Our Base schema: these properties will be shared with our "real" schemas
const Base = mongoose.model(
  "Base",
  new mongoose.Schema(
    {
      date_added: { type: Date, default: Date.now }
    },
    baseOptions
  )
);

module.exports = mongoose.model("Base");
